# api/serializers.py

from rest_framework import serializers
from .models import CBMRawData, CBMNonZero

class CBMRawDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = CBMRawData
        fields = '__all__'

class CBMNonZeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CBMNonZero
        fields = '__all__'
