from rest_framework import generics
from .models import Lesson
from .serializers import LessonSerializer

class LessonListView(generics.ListAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class TTSGenerateView(generics.GenericAPIView):
    def post(self, request):
        text = request.data.get('text')
        # Mock TTS: In production, integrate Google TTS
        audio_url = f"http://example.com/audio/{hash(text)}.mp3"  # Placeholder
        return Response({'audio_url': audio_url})