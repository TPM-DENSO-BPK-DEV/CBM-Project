# api/views.py
import logging
from rest_framework import generics
from .models import CBMRawData
from .serializers import CBMRawDataSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework.pagination import PageNumberPagination

logger = logging.getLogger(__name__)

class CBMRawDataPagination(PageNumberPagination):
    page_size = 10  # Adjust the page size as needed

class CBMRawDataList(generics.ListAPIView):
    queryset = CBMRawData.objects.all().order_by('-id')
    serializer_class = CBMRawDataSerializer
    pagination_class = CBMRawDataPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication]

    def list(self, request, *args, **kwargs):
        logger.debug(f"Request user: {request.user}")
        logger.debug(f"Request auth: {request.auth}")
        logger.debug(f"Request headers: {request.headers}")
        return super().list(request, *args, **kwargs)

class CBMRawDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CBMRawData.objects.all().order_by('-id')
    serializer_class = CBMRawDataSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication]

    def retrieve(self, request, *args, **kwargs):
        logger.debug(f"Request user: {request.user}")
        logger.debug(f"Request auth: {request.auth}")
        logger.debug(f"Request headers: {request.headers}")
        return super().retrieve(request, *args, **kwargs)