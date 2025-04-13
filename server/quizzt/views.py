from django.shortcuts import render
from rest_framework import viewsets
from openai import OpenAI
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import TodoItem, User, Quiz, QuizOption, QuizQuestion
import json
from .serializers import TodoItemSerializer, UserSerializer, QuizSerializer

class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

class UserViewSet(viewsets.ModelViewSet): # controller allows user to post, get user (all/single), update user (patch), delete user
    queryset = User.objects.all()
    serializer_class = UserSerializer 

class GenerateQuizView(APIView):
    def post(self, request):
        uploaded_file = request.FILES.get("file")

        if not uploaded_file:
            return Response({"error": "No file uploaded"}, status=400)
        
        file_content = uploaded_file.read().decode("utf-8")
        client = OpenAI(api_key=settings.OPENAI_API_KEY)

        prompt = f"""Generate a multiple choice quiz with a mix of True/False and Multiple Choice Questions based on the following notes:
        {file_content}
        Format the response as JSON with the question, options, and correct answer."""


        try:
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            quiz = response.choices[0].message['content']
            return Response({"quiz": quiz}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


class GenerateQuizFromTextView(APIView):
    def post(self, request):
        notes = request.data.get("notes")

        if not notes:
            return Response({"error": "No 'notes' field found in the request body"}, status=400)

        prompt = f"""
You are an educational AI tutor. Based on the notes below, generate a quiz that includes:
- At least 2 multiple choice questions (4 options: a, b, c, d)
- At least 1 true/false question

Each question must include:
- A string field called "question"
- A string field called "question_type" with values: "multiple_choice" or "true_false"
- A dictionary called "options" where keys are "a", "b", "c", "d" (or just "a", "b" for true/false)
- A field called "correct_answer" with the correct option key (e.g., "a")

Format the final response as JSON in this structure:
{{
  "quiz": [
    {{
      "question": "What is the purpose of frontend development?",
      "question_type": "multiple_choice",
      "options": {{
        "a": "To handle backend logic",
        "b": "To manage databases",
        "c": "To create the visual and interactive parts of an application",
        "d": "To write deployment scripts"
      }},
      "correct_answer": "c"
    }},
    {{
      "question": "True or False: Backend development includes managing the server and database.",
      "question_type": "true_false",
      "options": {{
        "a": "True",
        "b": "False"
      }},
      "correct_answer": "a"
    }}
  ]
}}

Only respond with valid JSON. Do not include explanations or intro text.

Notes:
{notes}
"""

        try:
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            quiz_content = response.choices[0].message.content

            # 🧠 Try to load the quiz JSON
            try:
                quiz_data = json.loads(quiz_content)
            except json.JSONDecodeError:
                return Response({"error": "Failed to parse GPT JSON. Check formatting."}, status=500)

            # 🏗 Create Quiz object
            quiz_obj = Quiz.objects.create(title="AI Generated Quiz")

            for item in quiz_data.get("quiz", []):
                question_text = item.get("question")
                options = item.get("options", {})
                correct_key = item.get("correct_answer")

                q_type = "true_false" if len(options) == 2 else "multiple_choice"
                question_obj = QuizQuestion.objects.create(
                    quiz=quiz_obj,
                    question=question_text,
                    question_type=q_type,
                )

                for key, option_text in options.items():
                    QuizOption.objects.create(
                        question=question_obj,
                        option_key=key,
                        option_text=option_text,
                        is_correct=(key == correct_key)
                    )

            # ✅ Return full saved quiz structure
            serializer = QuizSerializer(quiz_obj)
            return Response(serializer.data, status=201)

        except Exception as e:
            import traceback
            traceback.print_exc()
            return Response({"error": str(e)}, status=500)

class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Quiz.objects.all().order_by('-created_at')
    serializer_class = QuizSerializer