# tests/test_news.py
import pytest
from django.test import TestCase
from apps.news.models import NewsItem

class NewsItemTestCase(TestCase):
    def test_newsitem_creation(self):
        news = NewsItem.objects.create(
            title='Farmers Market Update',
            body='New crops have arrived at the local market.',
            category='Market',
            region='Central',
            source='Local News'
        )
        self.assertEqual(news.title, 'Farmers Market Update')
        self.assertEqual(news.region, 'Central')
