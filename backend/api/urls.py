# api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('cbm_raw_data/', views.CBMRawDataList.as_view(), name='cbmrawdata-list'),
    path('cbm_raw_data/<int:pk>/', views.CBMRawDataDetail.as_view(), name='cbmrawdata-detail'),
]
