from django.core.management.base import BaseCommand
from django.db import IntegrityError
from decimal import Decimal
import random

from apps.users.models import User
from apps.marketplace.models import Product, Equipment, Booking

# Optional imports
try:
    from apps.farms.models import Farm
except ImportError:
    Farm = None

try:
    from apps.news.models import News
except ImportError:
    News = None


class Command(BaseCommand):
    help = "Seeds the database with sample data (users, products, equipment, farms, news, etc.)"

    def handle(self, *args, **options):
        self.stdout.write("🌱 Seeding sample data...")

        try:
            # --- Create sample users ---
            supplier, _ = User.objects.get_or_create(
                username='supplier',
                defaults={
                    'email': 'supplier@example.com',
                    'password': 'supplier123',
                    'role': 'agrovet',
                    'phone': '0712345678',
                },
            )

            farmer, _ = User.objects.get_or_create(
                username='farmer',
                defaults={
                    'email': 'farmer@example.com',
                    'password': 'farmer123',
                    'role': 'farmer',
                    'phone': '0798765432',
                },
            )

            # --- Create sample products ---
            Product.objects.get_or_create(
                sku='SKU001',
                defaults={
                    'supplier': supplier,
                    'stock': 20,
                    'price': 120.00,
                    'unit': 'kg',
                },
            )

            Product.objects.get_or_create(
                sku='SKU002',
                defaults={
                    'supplier': supplier,
                    'stock': 15,
                    'price': 95.50,
                    'unit': 'litre',
                },
            )

            # --- Create sample equipment ---
            equip, _ = Equipment.objects.get_or_create(
                owner=supplier,
                type='Tractor',
                hourly_rate=5000.00,
                location='Nakuru',
            )

            # --- Create sample booking ---
            Booking.objects.get_or_create(
                equipment=equip,
                renter=farmer,
                status='pending',
                escrow_amount=1000.00,
                start_time='2025-11-05T08:00:00Z',
                end_time='2025-11-05T10:00:00Z',
            )

            # --- Create demo farms (if model exists) ---
            if Farm:
                farm_defaults = {}
                farm_fields = [f.name for f in Farm._meta.get_fields()]

                # Optional safe defaults
                if 'name' in farm_fields:
                    farm_defaults['name'] = 'Demo Farm'
                if 'address' in farm_fields:
                    farm_defaults['address'] = 'Nakuru'
                if 'location' in farm_fields:
                    farm_defaults['location'] = 'Nakuru'
                if 'size' in farm_fields:
                    farm_defaults['size'] = 5
                if 'size_ha' in farm_fields:
                    farm_defaults['size_ha'] = 5
                if 'description' in farm_fields:
                    farm_defaults['description'] = 'Sample demo farm for testing.'
                if 'latitude' in farm_fields:
                    farm_defaults['latitude'] = random.uniform(-1.286389, -1.286000)
                if 'longitude' in farm_fields:
                    farm_defaults['longitude'] = random.uniform(36.817223, 36.820000)
                if 'soil_ph' in farm_fields:
                    farm_defaults['soil_ph'] = 6.5
                if 'soil_type' in farm_fields:
                    farm_defaults['soil_type'] = 'Loam'
                if 'crop_type' in farm_fields:
                    farm_defaults['crop_type'] = 'Maize'
                if 'rainfall' in farm_fields:
                    farm_defaults['rainfall'] = 100.0
                if 'temperature' in farm_fields:
                    farm_defaults['temperature'] = 24.0

                # Fallback for required fields missing from farm_defaults
                for field in Farm._meta.fields:
                    if (
                        not field.null
                        and field.name not in farm_defaults
                        and not field.auto_created
                    ):
                        # Safely check if field has a default
                        has_default = hasattr(field, "default")
                        if has_default and getattr(field, "default", None) not in [None, ""]:
                            continue
                        # Fill with safe value
                        if field.get_internal_type() in ['CharField', 'TextField']:
                            farm_defaults[field.name] = "N/A"
                        elif field.get_internal_type() in ['FloatField', 'DecimalField']:
                            farm_defaults[field.name] = 0.0
                        elif field.get_internal_type() == 'IntegerField':
                            farm_defaults[field.name] = 0

                Farm.objects.get_or_create(
                    owner=farmer,
                    defaults=farm_defaults,
                )

            # --- Create demo news articles (if model exists) ---
            if News:
                for i in range(3):
                    news_defaults = {'content': "This is demo content for testing."}
                    if hasattr(News, 'author'):
                        news_defaults['author'] = supplier
                    if hasattr(News, 'category'):
                        news_defaults['category'] = 'General'

                    News.objects.get_or_create(
                        title=f"Demo Article {i+1}",
                        defaults=news_defaults,
                    )

            self.stdout.write(self.style.SUCCESS("✅ Seeded data loaded successfully!"))

        except IntegrityError as e:
            self.stdout.write(self.style.WARNING(f"⚠️ IntegrityError: {e}"))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Error: {e}"))
