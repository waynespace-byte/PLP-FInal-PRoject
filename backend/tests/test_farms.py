import pytest
from django.test import TestCase
from apps.farms.models import Farm 
from apps.users.models import User

class FarmTestCase(TestCase):
    def setUp(self):  # Add setUp to create user
        self.user = User.objects.create_user(username='farmer', role='farmer', phone_number='1234567890')
        
    def test_farm_creation(self):
        farm = Farm.objects.create(owner=self.user, name='Green Acres', longitude=36.8219, latitude=-1.2921, size_ha=2.5, soil_ph=7.0)
        self.assertEqual(farm.name, 'Green Acres')
        self.assertEqual(farm.size_ha, 2.5)
