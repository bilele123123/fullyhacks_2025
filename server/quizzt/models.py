from django.db import models

class TodoItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()


    def __str__(self):
        return self.name

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
class Quiz(models.Model):
    title = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

class QuizQuestion(models.Model):
    QUESTION_TYPES = (
        ("multiple_choice", "Multiple Choice"),
        ("true_false", "True/False"),
    )

    quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    question = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)

class QuizOption(models.Model):
    question = models.ForeignKey(QuizQuestion, related_name="options", on_delete=models.CASCADE)
    option_key = models.CharField(max_length=1)  # "a", "b", "c", etc.
    option_text = models.TextField()
    is_correct = models.BooleanField(default=False)


class FlashcardSet(models.Model):
    title = models.CharField(max_length=255, default="AI Generated Flashcards")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title 

class Flashcard(models.Model):
    set = models.ForeignKey(FlashcardSet, related_name="cards", on_delete=models.CASCADE)
    term = models.TextField()
    definition = models.TextField()

    def __str__(self):
        return self.term
