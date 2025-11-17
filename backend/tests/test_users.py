import pytest
from django.test import TestCase
from apps.users.models import User

class UserTestCase(TestCase):
    def test_user_creation(self):
        user = User.objects.create_user(username='testfarmer', role='farmer', phone='123456789')
        self.assertEqual(user.role, 'farmer')