from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Product, Equipment, Booking
from .serializers import ProductSerializer, EquipmentSerializer, BookingSerializer


# ✅ List all products or create a new one
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Attach current user if model has owner field
        serializer.save(owner=self.request.user)


# ✅ Retrieve, update, or delete a single product
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        product = self.get_object()
        if hasattr(product, "owner") and product.owner != self.request.user:
            raise PermissionDenied("You do not have permission to edit this product.")
        serializer.save()

    def perform_destroy(self, instance):
        if hasattr(instance, "owner") and instance.owner != self.request.user:
            raise PermissionDenied("You do not have permission to delete this product.")
        instance.delete()


# ✅ List all equipment
class EquipmentListView(generics.ListAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer


# ✅ Create a booking
class BookingCreateView(generics.CreateAPIView):
    serializer_class = BookingSerializer
