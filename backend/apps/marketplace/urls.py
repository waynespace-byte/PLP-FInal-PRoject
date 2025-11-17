from django.urls import path
from django.http import JsonResponse
from .views import (
    ProductListCreateView,
    ProductDetailView,
    EquipmentListView,
    BookingCreateView,
)

def marketplace_root(request):  # ✅ Add this function
    return JsonResponse({
        "marketplace_api": "Welcome to Marketplace API",
        "available_endpoints": {
            "products": "/api/v1/marketplace/products/",
            "product_detail": "/api/v1/marketplace/products/<id>/",
            "equipment": "/api/v1/marketplace/equipment/",
            "book": "/api/v1/marketplace/book/",
        }
    })

urlpatterns = [
    path('', marketplace_root, name='marketplace-root'),
    
    # Products
    path('products/', ProductListCreateView.as_view(), name='product-list-create'),
    path('products/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),

    # Equipment
    path('equipment/', EquipmentListView.as_view(), name='equipment-list'),

    # Bookings
    path('book/', BookingCreateView.as_view(), name='booking-create'),
]
