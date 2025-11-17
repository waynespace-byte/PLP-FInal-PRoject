from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ('farmer', 'Farmer'),
        ('agrovet', 'Agrovet'),
        ('equipment_owner', 'Equipment Owner'),
        ('sacco_officer', 'SACCO Officer'),
        ('admin', 'Admin'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='farmer')
    phone = models.CharField(max_length=15, unique=True)
    verified = models.BooleanField(default=False)