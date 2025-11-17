from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from apps.users.models import User

class Farm(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    latitude = models.FloatField(validators=[MinValueValidator(-90), MaxValueValidator(90)])
    longitude = models.FloatField(validators=[MinValueValidator(-180), MaxValueValidator(180)])
    size_ha = models.FloatField(validators=[MinValueValidator(0)])
    soil_ph = models.FloatField(validators=[MinValueValidator(0), MaxValueValidator(14)])
    history = models.JSONField(default=dict)
    crops = models.JSONField(default=list)