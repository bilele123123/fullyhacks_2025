from rest_framework import serializers
from .models import TodoItem
from .models import User
from .models import Quiz, QuizQuestion, QuizOption, FlashcardSet, Flashcard

class TodoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoItem
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class QuizOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizOption
        fields = ['id', 'option_key', 'option_text', 'is_correct']

class QuizQuestionSerializer(serializers.ModelSerializer):
    options = QuizOptionSerializer(many=True)

    class Meta:
        model = QuizQuestion
        fields = ['id', 'question', 'question_type', 'options']

class QuizSerializer(serializers.ModelSerializer):
    questions = QuizQuestionSerializer(many=True)

    class Meta:
        model = Quiz
        fields = ['id', 'title', 'created_at', 'questions']

class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = ['id', 'term', 'definition']

class FlashcardSetSerializer(serializers.ModelSerializer):
    cards = FlashcardSerializer(many=True, read_only=True)

    class Meta:
        model = FlashcardSet
        fields = ['id', 'title', 'created_at', 'cards']