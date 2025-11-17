# backend/apps/marketplace/serializers.py
from rest_framework import serializers
from .models import Product, Equipment, Booking

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at', 'supplier']

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['supplier'] = user
        return super().create(validated_data)


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)
