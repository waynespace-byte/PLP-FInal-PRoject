from django.urls import path
from .views import LessonListView, TTSGenerateView

urlpatterns = [
    path('lessons/', LessonListView.as_view(), name='lesson-list'),
    path('tts/', TTSGenerateView.as_view(), name='tts-generate'),
]