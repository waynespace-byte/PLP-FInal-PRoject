import pytest
from django.test import TestCase
from apps.farms.models import Farm  # adjust the import to your app structure

class FarmTestCase(TestCase):
    def test_farm_creation(self):
        farm = Farm.objects.create(name='Green Acres', location='Nairobi', area_ha=2.5)
        self.assertEqual(farm.name, 'Green Acres')
        self.assertEqual(farm.area_ha, 2.5)
