from django.urls import path
from .views import extract_view
from .api_views import api_extract, api_chat, api_health

urlpatterns = [
    path('', extract_view, name='extract_view'),
    path('api/extract/', api_extract, name='api_extract'),
    path('api/chat/', api_chat, name='api_chat'),
    path('api/health/', api_health, name='api_health'),
]
