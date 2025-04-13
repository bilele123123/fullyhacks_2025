from django.shortcuts import render
from rest_framework import viewsets
from openai import OpenAI
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import TodoItem, User
from .serializers import TodoItemSerializer, UserSerializer
from .models import User
from .serializers import UserSerializer

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

        prompt = f"""Generate a multiple choice quiz with a mix of True/False and Multiple Choice Questions 
based on the following notes:

{notes}

Format the response as JSON with the question, options, and correct answer.
"""

        try:
            client = OpenAI(api_key=settings.OPENAI_API_KEY)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            quiz = response.choices[0].message.content
            return Response({"quiz": quiz}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
