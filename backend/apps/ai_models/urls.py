from django.urls import path
from .views import CropAdvisorView, DiseaseDetectionView

urlpatterns = [
    path('advisor/recommend/', CropAdvisorView.as_view(), name='crop-advisor'),
    path('diagnose/', DiseaseDetectionView.as_view(), name='disease-detect'),
]