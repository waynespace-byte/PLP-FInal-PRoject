from rest_framework import generics
from rest_framework.response import Response
from .models import Lesson
from .serializers import LessonSerializer

class LessonListView(generics.ListAPIView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class TTSGenerateView(generics.GenericAPIView):
    def post(self, request):
        text = request.data.get('text')
        if not text:
            return Response({'error': 'Text required'}, status=400)
        # Mock TTS: In production, integrate Google TTS
        audio_url = f"http://example.com/audio/{hash(text)}.mp3"
        return Response({'audio_url': audio_url})