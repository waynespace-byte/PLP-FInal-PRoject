from rest_framework import generics
from .models import LoanRequest
from .serializers import LoanRequestSerializer

class LoanApplyView(generics.CreateAPIView):
    serializer_class = LoanRequestSerializer

    def perform_create(self, serializer):
        # Mock credit scoring
        score = 0.8  # Placeholder
        serializer.save(farmer=self.request.user, score=score, status='approved' if score > 0.7 else 'rejected')