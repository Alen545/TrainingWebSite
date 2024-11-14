from django.urls import path
from . import views  

urlpatterns = [
    path('registerUser/', views.UserRegister.as_view(), name='register'),  
    path('loginUser/', views.UserLogin.as_view(),name='login'),
    path('userData/', views.GetUserData.as_view(), name='user'),
    path('manageUserRequest/<int:user_id>/<str:action>/', views.UserActionView.as_view(), name='manage_user_request'),
    path('profileOperations/', views.ProfileOperations.as_view(), name='profileOperations'),
     path('reset-password/', views.ResetPasswordView.as_view(), name='reset_password'),
]
