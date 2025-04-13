from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoItemViewSet
from .views import UserViewSet

router = DefaultRouter()
router.register(r'todos', TodoItemViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
