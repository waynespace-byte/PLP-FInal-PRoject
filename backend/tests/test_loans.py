import pytest
from django.test import TestCase
from apps.loans.models import LoanRequest
from apps.users.models import User

class LoanTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testfarmer', role='farmer', phone='123456789')

    def test_loan_application(self):
        loan = LoanRequest.objects.create(farmer=self.user, amount=1000, purpose='seeds')
        self.assertEqual(loan.amount, 1000)
        self.assertEqual(loan.farmer.username, 'testfarmer')
