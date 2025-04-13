from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoItemViewSet
from .views import UserViewSet
from .views import GenerateQuizView, GenerateQuizFromTextView
from .views import QuizViewSet, GenerateQuizView, GenerateQuizFromTextView

router = DefaultRouter()
router.register(r'todos', TodoItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'quizzes', QuizViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("generate-quiz/", GenerateQuizView.as_view(), name="generate_quiz_from_file"),
    path("generate-quiz-text/", GenerateQuizFromTextView.as_view(), name="generate_quiz_from_text"),
    path("generate-quiz/", GenerateQuizView.as_view(), name="generate_quiz"),
    path("generate-quiz-text/", GenerateQuizFromTextView.as_view(), name="generate_quiz_text"),
]