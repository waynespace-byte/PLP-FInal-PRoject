import pytest
from django.test import TestCase
from apps.users.models import User
from apps.payments.models import Transaction

class PaymentTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='payer', role='farmer', phone='076543210')

    def test_payment_initiation(self):
        payment = Transaction.objects.create(user=self.user, amount=1500, method='MPesa')
        self.assertEqual(payment.amount, 1500)
        self.assertEqual(payment.user.username, 'payer')
        self.assertEqual(payment.method, 'MPesa')
