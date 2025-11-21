from django.urls import path
from .views import MPesaWebhookView, PayPalPaymentView, InitiatePaymentView

urlpatterns = [
    path('mpesa/webhook/', MPesaWebhookView.as_view(), name='mpesa-webhook'),
    path('paypal/', PayPalPaymentView.as_view(), name='paypal-payment'),
    path('initiate/', InitiatePaymentView.as_view(), name='initiate_payment'),
]