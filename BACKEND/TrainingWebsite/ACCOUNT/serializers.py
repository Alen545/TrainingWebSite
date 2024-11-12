from rest_framework import serializers
from .models import USER

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = [
            'id','first_name','last_name','email','qualification','phone','passout_year','gender','profile_img','is_staff','is_active','username'
        ]