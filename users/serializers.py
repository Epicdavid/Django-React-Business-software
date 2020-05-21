from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SignupSerializer(RegisterSerializer):
    is_client = serializers.BooleanField()
    is_staff = serializers.BooleanField()

    class Meta:
        model = User
        fields = '__all__'      