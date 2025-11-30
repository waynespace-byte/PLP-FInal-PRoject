from rest_framework import serializers
from .models import LoanRequest

class LoanRequestSerializer(serializers.ModelSerializer):
    farmer = serializers.ReadOnlyField(source='farmer.username')
    class Meta:
        model = LoanRequest
        fields = '__all__'