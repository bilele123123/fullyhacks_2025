from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import User

# Create your tests here.
class UserAPITestCase(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create(first_name="Amy", last_name="Le")
        self.user2 = User.objects.create(first_name="Brian", last_name="Tran")
        self.base_url = reverse('user-list')  # From DefaultRouter

    def test_get_users(self):
        response = self.client.get(self.base_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_post_user(self):
        data = {'first_name': 'Charlie', 'last_name': 'Nguyen'}
        response = self.client.post(self.base_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 3)

    def test_get_user_by_id(self):
        url = reverse('user-detail', args=[self.user1.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'Amy')

    def test_put_user_by_id(self):
        url = reverse('user-detail', args=[self.user1.id])
        data = {'first_name': 'Aimee', 'last_name': 'Lee'}
        response = self.client.put(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user1.refresh_from_db()
        self.assertEqual(self.user1.first_name, 'Aimee')

    def test_patch_user_by_id(self):
        url = reverse('user-detail', args=[self.user2.id])
        data = {'last_name': 'Do'}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user2.refresh_from_db()
        self.assertEqual(self.user2.last_name, 'Do')

    def test_delete_user_by_id(self):
        url = reverse('user-detail', args=[self.user2.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 1)