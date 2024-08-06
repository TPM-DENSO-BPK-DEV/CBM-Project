# api/serializers.py

from rest_framework import serializers
from .models import CBMRawData

class CBMRawDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CBMRawData
        fields = '__all__'
