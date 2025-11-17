from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Farm
from .serializers import FarmSerializer

# List and create farms
class FarmListCreateView(generics.ListCreateAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return farms owned by the authenticated user
        return Farm.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the owner when creating a farm
        serializer.save(owner=self.request.user)

# Retrieve, update, or delete a single farm
class FarmRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Farm.objects.all()
    serializer_class = FarmSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only allow access to farms owned by the authenticated user
        return Farm.objects.filter(owner=self.request.user)

    def perform_update(self, serializer):
        # Ensure owner remains the authenticated user
        serializer.save(owner=self.request.user)
