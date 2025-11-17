# backend/apps/marketplace/models.py
from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
from django.utils import timezone

def get_current_date():
    return timezone.now().date()

def get_current_datetime():
    return timezone.now()


User = get_user_model()

class Product(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='products',
        null=True,
        blank=True
    )
    name = models.CharField(max_length=255, default='Default Product Name')
    sku = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(default='')
    stock = models.IntegerField()
    supplier = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='supplied_products')
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now) 
    start_date = models.DateField(default=get_current_date)

    def __str__(self):
        return self.name

class Equipment(models.Model):
    name = models.CharField(max_length=255, default='Default Equipment Name')
    price_per_day = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    available = models.BooleanField(default=True)
    image = models.ImageField(upload_to='equipment/', blank=True, null=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE)
    start_date = models.DateField(default=get_current_date)
    end_date = models.DateField(default=get_current_date)
    total_cost = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.user} - {self.equipment}"
