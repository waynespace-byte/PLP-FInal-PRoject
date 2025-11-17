from django.db import models

class NewsItem(models.Model):
    title = models.CharField(max_length=200)
    body = models.TextField()
    category = models.CharField(max_length=50)
    region = models.CharField(max_length=50)
    published_date = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=100)
    audio_url = models.URLField(blank=True)