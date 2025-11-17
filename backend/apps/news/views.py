from rest_framework import generics
from .models import NewsItem
from .serializers import NewsItemSerializer

class NewsListView(generics.ListAPIView):
    serializer_class = NewsItemSerializer
    queryset = NewsItem.objects.all()

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        region = self.request.query_params.get('region')
        if category:
            queryset = queryset.filter(category=category)
        if region:
            queryset = queryset.filter(region=region)
        return queryset