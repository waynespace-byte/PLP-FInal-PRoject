from django.db import models
from apps.users.models import User

class Diagnosis(models.Model):
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.URLField()
    predicted_label = models.CharField(max_length=100)
    confidence = models.FloatField()
    recommendations = models.JSONField(default=dict)