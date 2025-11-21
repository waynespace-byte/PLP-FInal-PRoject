from .mpesa import stk_push
from rest_framework.views import APIView
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Transaction

class MPesaWebhookView(APIView):
    def post(self, request):
        # Mock M-Pesa success
        Transaction.objects.create(user=request.user, amount=100, status='success', provider='M-Pesa')
        return Response({'status': 'success'})

class PayPalPaymentView(APIView):
    def post(self, request):
        # Mock PayPal
        Transaction.objects.create(user=request.user, amount=request.data['amount'], status='success', provider='PayPal')
        return Response({'status': 'success'})
    
class InitiatePaymentView(APIView):
    def post(self, request):
        phone = request.data['phone']
        amount = request.data['amount']
        account_ref = request.data['account_ref']  # e.g., booking ID
        result = stk_push(phone, amount, account_ref)
        return Response(result)
