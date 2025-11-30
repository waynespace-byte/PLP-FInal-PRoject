from django.urls import path
from .views import CropAdvisorView, DiseaseDetectionView, WeatherView

urlpatterns = [
    path('weather/', WeatherView.as_view(), name='weather'),
    path('crop-advisor/', CropAdvisorView.as_view(), name='crop-advisor'),  
    path('disease-detection/', DiseaseDetectionView.as_view(), name='disease-detection'), 
]