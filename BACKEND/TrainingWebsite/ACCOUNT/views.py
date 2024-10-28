from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from .models import USER
from .serializers import UserRegistrationSerializer
import random
import string
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

def generate_random_username():
    characters = string.ascii_letters + string.digits + "!@#$%^&*"
    while True:
        username = ''.join(random.choices(characters, k=8))
        if not USER.objects.filter(username=username).exists(): 
            return username

def generate_random_password():
    return ''.join(random.choices('0123456789', k=6))

class UserRegister(APIView):
    def post(self, request):
        
        # Validate email
        email = request.data.get('email')
        if not email or "@" not in email or not email.endswith(".com"):
            return Response({"email": "Enter a valid email address."}, status=status.HTTP_400_BAD_REQUEST)
        
        if USER.objects.filter(email=email).exists():
            return Response({"email": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate phone number
        phone_number = request.data.get('phoneNumber')
        if len(phone_number) != 10 or not phone_number.isdigit():
            return Response({"phoneNumber": "Phone number must be 10 digits."}, status=status.HTTP_400_BAD_REQUEST)
        
        if USER.objects.filter(phone=phone_number).exists():  
            return Response({"phoneNumber": "Phone number already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserRegistrationSerializer(data=request.data)
        
        if serializer.is_valid():
            data = serializer.validated_data
            
            username = generate_random_username()  
            password = generate_random_password()

            user = USER.objects.create(
                username=username,
                first_name=data.get('firstName'),  
                last_name=data.get('lastName'),
                email=data.get('email'),
                qualification=data.get('qualification'),
                phone=data.get('phoneNumber'),
                passout_year=data.get('passoutYear'),
                gender=data.get('gender'),
                profile_img = request.FILES.get('profileImage'),
            )
            print("User",user)
            user.set_password(password) 
            user.is_activate = False 
            user.save()

            send_mail(
                "Welcome to Alen's Group",
                f'Your account has been created successfully. Your username is {username} and your password is {password}. Admin approval shortly.',
                'alengeorge1999@gmail.com',  
                [data['email']],
                fail_silently=False,
            )
            return Response({
                "message": "User registered successfully. Check your email for credentials.",
                },status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLogin(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Generate JWT token
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Invalid username or password."},
                status=status.HTTP_401_UNAUTHORIZED
            )
