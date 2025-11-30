import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
from .mpesa import stk_push
from .models import Transaction

class MPesaWebhookView(APIView):
    def post(self, request):
        # Mock M-Pesa success
        Transaction.objects.create(user=request.user, amount=100, status='success', provider='M-Pesa')
        return Response({'status': 'success'})

class PayPalPaymentView(APIView):
    permission_classes = [IsAuthenticated] 
    
    def post(self, request):
        amount = request.data.get('amount')
        if not amount:
            return Response({'error': 'Amount required'}, status=400)
        # Mock PayPal
        Transaction.objects.create(user=request.user, amount=request.data['amount'], status='success', provider='PayPal')
        return Response({'status': 'success'})
    
class InitiatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        phone = request.data.get('phone')  # Use .get() for safety
        amount = request.data.get('amount')
        account_ref = request.data.get('account_ref', 'default_ref')  # Optional with default
        if not phone or not amount:
            return Response({'error': 'Phone and amount required'}, status=400)
        result = stk_push(phone, amount, account_ref)
        return Response(result)
