from django.shortcuts import render
from rest_framework import viewsets
from .models import TodoItem
from .serializers import TodoItemSerializer
from .models import User
from .serializers import UserSerializer

class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all()
    serializer_class = TodoItemSerializer

class UserViewSet(viewsets.ModelViewSet): # controller allows user to post, get user (all/single), update user (patch), delete user
    queryset = User.objects.all()
    serializer_class = UserSerializer 