import pytest
from django.test import TestCase
from apps.learning.models import Lesson

class LearningTestCase(TestCase):
    def test_lesson_creation(self):
        lesson = Lesson.objects.create(title='Planting Maize', description='Step by step guide')
        self.assertEqual(lesson.title, 'Planting Maize')
