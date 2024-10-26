from django.urls import path
from ACCOUNT.views import UserRegister  

urlpatterns = [
    path('RegisterUser/', UserRegister.as_view(), name='register'),  
]
