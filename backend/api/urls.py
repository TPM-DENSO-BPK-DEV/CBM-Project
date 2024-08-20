from django.urls import path
from .views import CBMRawDataList, CBMRawDataDetail, CBMNonZeroList, CBMNonZeroDetail, show_cached_data

urlpatterns = [
    path('cbm_raw_data/', CBMRawDataList.as_view(), name='cbm_raw_data_list'),
    path('cbm_raw_data/<int:pk>/', CBMRawDataDetail.as_view(), name='cbm_raw_data_detail'),
    
    path('cbm_non_zero/', CBMNonZeroList.as_view(), name='cbm_non_zero_list'),
    path('cbm_non_zero/<int:pk>/', CBMNonZeroDetail.as_view(), name='cbm_non_zero_detail'),

    path('show_cached_data/', show_cached_data, name='show_cached_data'),
]
