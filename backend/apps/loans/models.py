from django.db import models
from apps.users.models import User

class LoanRequest(models.Model):
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    purpose = models.TextField()
    score = models.FloatField(default=0)
    status = models.CharField(max_length=20, default='pending')

class CreditScore(models.Model):
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.FloatField()
    breakdown = models.JSONField(default=dict)