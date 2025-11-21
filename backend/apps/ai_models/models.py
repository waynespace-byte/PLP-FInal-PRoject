from django.db import models
from apps.users.models import User

class Diagnosis(models.Model):
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.URLField()
    predicted_label = models.CharField(max_length=100)
    confidence = models.FloatField()
    recommendations = models.JSONField(default=dict)

class WeatherData(models.Model):  # For caching weather
    location = models.CharField(max_length=100)
    date = models.DateField()
    temperature = models.FloatField()
    humidity = models.FloatField()
    rainfall = models.FloatField()
class CropRecommendation(models.Model):  # Stores AI suggestions
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    soil_ph = models.FloatField()
    location = models.CharField(max_length=100)
    recommended_crop = models.CharField(max_length=100)
    yield_prediction = models.FloatField()
class DiseaseDetection(models.Model):  # For image uploads
    farmer = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='diseases/')
    detected_disease = models.CharField(max_length=100, blank=True)
    treatment = models.TextField(blank=True)
