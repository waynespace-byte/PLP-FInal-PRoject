from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, LoginView
from django.http import JsonResponse

def auth_root(request):
    return JsonResponse({
        "auth_endpoints": {
            "register": "/api/v1/auth/register/",
            "login": "/api/v1/auth/login/",
            "token_refresh": "/api/v1/auth/token/refresh/"
        }
    })

urlpatterns = [
    path('', auth_root, name='auth-root'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # <-- add this
]
