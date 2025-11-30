import requests
from django.conf import settings
import base64
import json
from datetime import datetime

def get_access_token():
    url = f"{settings.MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials"
    try:
        response = requests.get(url, auth=(settings.MPESA_CONSUMER_KEY, settings.MPESA_CONSUMER_SECRET), timeout=10)  # Add timeout
        response.raise_for_status()  # Raise error for bad status
        return response.json()['access_token']
    except requests.exceptions.RequestException as e:
        return {'error': f'Failed to get access token: {str(e)}'}


def stk_push(phone, amount, account_ref):
    access_token = get_access_token()
    if isinstance(access_token, dict) and 'error' in access_token:  # Handle token error
        return access_token
    url = f"{settings.MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest"
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode((settings.MPESA_SHORTCODE + settings.MPESA_PASSKEY + timestamp).encode()).decode()
    payload = {
        "BusinessShortCode": settings.MPESA_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": settings.MPESA_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": "https://yourdomain.com/payments/callback/",  # Your callback URL
        "AccountReference": account_ref,
        "TransactionDesc": "Payment for SmartFarmLink"
    }
    headers = {"Authorization": f"Bearer {access_token}"}
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=30)  # Add timeout (30s for STK Push)
        return response.json()
    except requests.exceptions.RequestException as e:
        return {'error': f'STK Push failed: {str(e)}'}