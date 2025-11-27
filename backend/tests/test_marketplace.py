import pytest
from django.test import TestCase
from apps.marketplace.models import Equipment
from apps.users.models import User

class MarketplaceTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='seller', role='farmer', phone='123456789')

    def test_equipment_creation(self):
        eq = Equipment.objects.create(owner=self.user, name='Tractor', description='Large tractor', price_per_day=2000)
        self.assertEqual(eq.name, 'Tractor')
        self.assertEqual(eq.price_per_day, 2000)
