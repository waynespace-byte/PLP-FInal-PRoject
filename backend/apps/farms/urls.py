from django.urls import path
from .views import FarmListCreateView, FarmRetrieveUpdateDestroyView

urlpatterns = [
    path('', FarmListCreateView.as_view(), name='farm-list'),
    path('<int:pk>/', FarmRetrieveUpdateDestroyView.as_view(), name='farm-detail'),
]
