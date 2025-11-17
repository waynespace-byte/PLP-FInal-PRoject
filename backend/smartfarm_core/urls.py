from django.contrib import admin
from django.http import JsonResponse
from django.urls import path, include, re_path
from django.shortcuts import redirect 
from django.views.static import serve
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static


schema_view = get_schema_view(
    openapi.Info(title="SmartFarmLink API", default_version='v1'),
    public=True,
    permission_classes=[permissions.AllowAny],
)

def api_root(request):
    return JsonResponse({
        "status": "SmartFarm backend is running ✅",
        "available_routes": {
            "auth": "/api/v1/auth/",
            "farms": "/api/v1/farms/",
            "news": "/api/v1/news/",
            "marketplace": "/api/v1/marketplace/",
            "loans": "/api/v1/loans/",
            "ai": "/api/v1/ai/",
            "learning": "/api/v1/learning/",
            "payments": "/api/v1/payments/"
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', lambda request: redirect('/api/v1/')),
    re_path(r'^favicon\.ico$', serve, {'path': 'favicon.ico', 'document_root': settings.STATIC_ROOT}),
    path('api/v1/', include([
        path('', api_root, name='api-root'),  # ✅ Add it *inside* api/v1/
        path('auth/', include('apps.users.urls')),
        path('farms/', include('apps.farms.urls')),
        path('news/', include('apps.news.urls')),
        path('marketplace/', include('apps.marketplace.urls')),
        path('loans/', include('apps.loans.urls')),
        path('ai/', include('apps.ai_models.urls')),
        path('learning/', include('apps.learning.urls')),
        path('payments/', include('apps.payments.urls')),
    ])),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
