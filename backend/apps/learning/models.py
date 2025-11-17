from django.db import models

class Lesson(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    video_url = models.URLField()
    language = models.CharField(max_length=50)
    sponsor = models.CharField(max_length=100, blank=True)