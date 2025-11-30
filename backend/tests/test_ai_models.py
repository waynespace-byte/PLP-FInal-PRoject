# tests/test_ai_models.py
import pytest
from django.test import TestCase
from apps.ai_models.models import CropRecommendation, DiseaseDetection
from apps.users.models import User

class CropRecommendationTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testfarmer', role='farmer', phone_number='123456789')

    def test_crop_recommendation_creation(self):
        recommendation = CropRecommendation.objects.create(
            farmer=self.user,
            soil_ph=6.5,
            location='Farmville',
            recommended_crop='Maize',
            yield_prediction=200.0
        )
        self.assertEqual(recommendation.recommended_crop, 'Maize')

class DiseaseDetectionTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testfarmer2', role='farmer', phone_number='987654321')

    def test_disease_detection_creation(self):
        detection = DiseaseDetection.objects.create(
            farmer=self.user,
            image='diseases/test.jpg',
            detected_disease='Leaf Spot',
            treatment='Apply fungicide'
        )
        self.assertEqual(detection.detected_disease, 'Leaf Spot')
