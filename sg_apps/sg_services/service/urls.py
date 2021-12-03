from django.urls import path

from . import views

urlpatterns = [
    path('', views.get_conversion_type, name='get_conversion_type'),
]
