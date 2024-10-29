from django.urls import path
from . import views  

urlpatterns = [
    path('registerUser/', views.UserRegister.as_view(), name='register'),  
    path('loginUser/', views.UserLogin.as_view(),name='login'),
    path('userData/', views.GetUserData.as_view(), name='user')
]
