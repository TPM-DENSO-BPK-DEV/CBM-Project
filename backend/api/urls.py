# api/urls.py

from django.urls import path
from .views import CBMRawDataList, CBMRawDataDetail

urlpatterns = [
    path('cbm_raw_data/', CBMRawDataList.as_view(), name='cbm_raw_data_list'),
    path('cbm_raw_data/<int:pk>/', CBMRawDataDetail.as_view(), name='cbm_raw_data_detail'),
]