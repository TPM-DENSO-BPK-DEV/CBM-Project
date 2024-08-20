import logging
from rest_framework import generics
from .models import CBMRawData, CBMNonZero
from .serializers import CBMRawDataSerializer, CBMNonZeroSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from rest_framework.pagination import PageNumberPagination
from django.core.cache import cache
from rest_framework.response import Response
from django.shortcuts import render
from django.conf import settings
import redis

logger = logging.getLogger(__name__)

# Establish connection to Redis using the correct service name
try:
    redis_client = redis.StrictRedis.from_url(settings.CACHES['default']['LOCATION'])
except redis.ConnectionError as e:
    logger.error(f"Redis connection error: {e}")
    redis_client = None

class CBMRawDataPagination(PageNumberPagination):
    page_size = 10  # Adjust the page size as needed

# Views for CBMRawData
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

        # Implement caching
        cache_key = 'cbm_raw_data_list'
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            logger.debug("Cache hit - using cached CBMRawData list.")
            return Response(cached_data)
        else:
            logger.debug("Cache miss - querying database for CBMRawData list.")
            response = super().list(request, *args, **kwargs)
            cache.set(cache_key, response.data, timeout=60*15)  # Cache the serialized data for 15 minutes

            if redis_client:
                try:
                    redis_client.set('cbm_raw_data_list_key', 'CBM Raw Data List Cached', ex=60*15)
                except redis.ConnectionError as e:
                    logger.error(f"Failed to set key in Redis: {e}")

            return response

class CBMRawDataDetail(generics.RetrieveAPIView):
    queryset = CBMRawData.objects.all().order_by('-id')
    serializer_class = CBMRawDataSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication]

    def retrieve(self, request, *args, **kwargs):
        logger.debug(f"Request user: {request.user}")
        logger.debug(f"Request auth: {request.auth}")
        logger.debug(f"Request headers: {request.headers}")

        # Implement caching
        cache_key = f'cbm_raw_data_detail_{kwargs["pk"]}'
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            logger.debug("Cache hit - using cached CBMRawData detail.")
            return Response(cached_data)
        else:
            logger.debug("Cache miss - querying database for CBMRawData detail.")
            response = super().retrieve(request, *args, **kwargs)
            cache.set(cache_key, response.data, timeout=60*15)  # Cache the serialized data for 15 minutes

            if redis_client:
                try:
                    redis_client.set(f'cbm_raw_data_detail_key_{kwargs["pk"]}', 'CBM Raw Data Detail Cached', ex=60*15)
                except redis.ConnectionError as e:
                    logger.error(f"Failed to set key in Redis: {e}")

            return response

# Views for CBMNonZero
class CBMNonZeroList(generics.ListAPIView):
    queryset = CBMNonZero.objects.all().order_by('-id')
    serializer_class = CBMNonZeroSerializer
    pagination_class = CBMRawDataPagination
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication]

    def list(self, request, *args, **kwargs):
        logger.debug(f"Request user: {request.user}")
        logger.debug(f"Request auth: {request.auth}")
        logger.debug(f"Request headers: {request.headers}")

        # Implement caching
        cache_key = 'cbm_non_zero_list'
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            logger.debug("Cache hit - using cached CBMNonZero list.")
            return Response(cached_data)
        else:
            logger.debug("Cache miss - querying database for CBMNonZero list.")
            response = super().list(request, *args, **kwargs)
            cache.set(cache_key, response.data, timeout=60*15)  # Cache the serialized data for 15 minutes

            if redis_client:
                try:
                    redis_client.set('cbm_non_zero_list_key', 'CBM Non-Zero List Cached', ex=60*15)
                except redis.ConnectionError as e:
                    logger.error(f"Failed to set key in Redis: {e}")

            return response

class CBMNonZeroDetail(generics.RetrieveAPIView):
    queryset = CBMNonZero.objects.all().order_by('-id')
    serializer_class = CBMNonZeroSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication]

    def retrieve(self, request, *args, **kwargs):
        logger.debug(f"Request user: {request.user}")
        logger.debug(f"Request auth: {request.auth}")
        logger.debug(f"Request headers: {request.headers}")

        # Implement caching
        cache_key = f'cbm_non_zero_detail_{kwargs["pk"]}'
        cached_data = cache.get(cache_key)
        if cached_data is not None:
            logger.debug("Cache hit - using cached CBMNonZero detail.")
            return Response(cached_data)
        else:
            logger.debug("Cache miss - querying database for CBMNonZero detail.")
            response = super().retrieve(request, *args, **kwargs)
            cache.set(cache_key, response.data, timeout=60*15)  # Cache the serialized data for 15 minutes

            if redis_client:
                try:
                    redis_client.set(f'cbm_non_zero_detail_key_{kwargs["pk"]}', 'CBM Non-Zero Detail Cached', ex=60*15)
                except redis.ConnectionError as e:
                    logger.error(f"Failed to set key in Redis: {e}")

            return response

# New view to display cached data
def show_cached_data(request):
    # Connect to Redis
    try:
        redis_client = redis.StrictRedis.from_url(settings.CACHES['default']['LOCATION'])
    except redis.ConnectionError as e:
        logger.error(f"Redis connection error: {e}")
        redis_client = None

    # Retrieve cached data for each view
    cbm_raw_data_list = cache.get('cbm_raw_data_list')
    cbm_raw_data_detail = {key: cache.get(key) for key in cache.keys('cbm_raw_data_detail_*')}
    cbm_non_zero_list = cache.get('cbm_non_zero_list')
    cbm_non_zero_detail = {key: cache.get(key) for key in cache.keys('cbm_non_zero_detail_*')}

    # Get TTL (time left before expiration) for each cached key
    cbm_raw_data_list_ttl = None
    cbm_raw_data_detail_ttl = {}
    cbm_non_zero_list_ttl = None
    cbm_non_zero_detail_ttl = {}

    if redis_client:
        try:
            cbm_raw_data_list_ttl = redis_client.ttl('cbm_raw_data_list_key')
            for key in cbm_raw_data_detail.keys():
                cbm_raw_data_detail_ttl[key] = redis_client.ttl(key)
            cbm_non_zero_list_ttl = redis_client.ttl('cbm_non_zero_list_key')
            for key in cbm_non_zero_detail.keys():
                cbm_non_zero_detail_ttl[key] = redis_client.ttl(key)
        except redis.ConnectionError as e:
            logger.error(f"Failed to retrieve TTL from Redis: {e}")
    else:
        logger.error("Redis client is not available, cannot retrieve TTLs.")

    # Pass the cached data and TTLs to the template
    return render(request, 'show_cached_data.html', {
        'cbm_raw_data_list': cbm_raw_data_list,
        'cbm_raw_data_list_ttl': cbm_raw_data_list_ttl,
        'cbm_raw_data_detail': cbm_raw_data_detail,
        'cbm_raw_data_detail_ttl': cbm_raw_data_detail_ttl,
        'cbm_non_zero_list': cbm_non_zero_list,
        'cbm_non_zero_list_ttl': cbm_non_zero_list_ttl,
        'cbm_non_zero_detail': cbm_non_zero_detail,
        'cbm_non_zero_detail_ttl': cbm_non_zero_detail_ttl,
    })
