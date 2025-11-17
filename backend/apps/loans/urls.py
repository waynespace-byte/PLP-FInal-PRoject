from django.urls import path
from django.http import JsonResponse
from .views import LoanApplyView

def loans_root(request):
    return JsonResponse({
        "loans_api": "Welcome to Loans API",
        "available_endpoints": {
            "apply": "/api/v1/loans/apply/",
        }
    })

urlpatterns = [
    path('', loans_root, name='loans-root'),
    path('apply/', LoanApplyView.as_view(), name='loan-apply'),
]