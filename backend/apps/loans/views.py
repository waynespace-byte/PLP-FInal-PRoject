from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import LoanRequest
from .serializers import LoanRequestSerializer
import logging

logger = logging.getLogger(__name__)

class LoanApplyView(generics.CreateAPIView):
    serializer_class = LoanRequestSerializer
    permission_classes = [IsAuthenticated]  # Require login

    def perform_create(self, serializer):
        # Mock credit scoring
        score = 0.8  # Placeholder
        status_value = 'approved' if score > 0.7 else 'rejected'
        serializer.save(farmer=self.request.user, score=score, status=status_value)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            logger.info(f"Loan created: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        logger.error(f"Loan validation errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)