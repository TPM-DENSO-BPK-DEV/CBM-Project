# api/views.py

from rest_framework import generics
from .models import CBMRawData
from .serializers import CBMRawDataSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

class CBMRawDataPagination(PageNumberPagination):
    page_size = 10  # Adjust the page size as needed

class CBMRawDataList(generics.ListAPIView):
    queryset = CBMRawData.objects.all().order_by('-id')
    serializer_class = CBMRawDataSerializer
    pagination_class = CBMRawDataPagination
    permission_classes = [IsAuthenticated]

class CBMRawDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CBMRawData.objects.all().order_by('-id')
    serializer_class = CBMRawDataSerializer
    permission_classes = [IsAuthenticated]
