from rest_framework import serializers
from .models import TextoGenerativo

class TextoGenerativoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextoGenerativo

        fields = "__all__"