from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from .models import User
from allauth.account.adapter import get_adapter

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SignupSerializer(RegisterSerializer):
    btc_wallet = serializers.CharField(max_length=300)    

    class Meta:
        model = User
        fields = ('email','username','password','btc_wallet') 


    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'btc_wallet': self.validated_data.get('btc_wallet', ''),
            'email': self.validated_data.get('email', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_student = True
        adapter.save_user(request, user, self)
        return user
    
