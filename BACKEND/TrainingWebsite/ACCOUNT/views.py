import random
import string
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .serializers import UserRegistrationSerializer
from .models import USER

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

        data=request.data

        username = generate_random_username()  
        password = generate_random_password()

        # Data store in db
        user = USER.objects.create_user(
            username=username,
            first_name=data.get('firstName'),  
            last_name=data.get('lastName'),
            email=data.get('email'),
            qualification=data.get('qualification'),
            phone=data.get('phoneNumber'),
            passout_year=data.get('passoutYear'),
            gender=data.get('gender'),
            profile_img = request.FILES.get('profileImage'),
            password=password,
            is_active = False 
        )
        if user:

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

        return Response({"Error":"User registered not successfully"}, status=status.HTTP_400_BAD_REQUEST)

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

class GetUserData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if user.is_staff:
            users = USER.objects.filter(is_staff=False)
            serializer = UserRegistrationSerializer(users, many=True)
            return Response(serializer.data)
        
        serializer = UserRegistrationSerializer(user)
        return Response(serializer.data)
        
#Accept/Decline User
class UserActionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id, action):
        try:
            user = USER.objects.get(id=user_id)
            if action == "accept":
                user.is_active = True
                user.save()
                # Send welcome email
                send_mail(
                    'Welcome!',
                    'Your account is now active. Welcome!',
                    'admin@yourdomain.com',
                    [user.email],
                    fail_silently=False,
                )
                return Response({'message': 'User accepted and email sent.'}, status=status.HTTP_200_OK)

            elif action == "decline":
                # Send decline email before deleting user
                send_mail(
                    'Account Declined',
                    'Sorry, your account has been declined.',
                    'admin@yourdomain.com',
                    [user.email],
                    fail_silently=False,
                )
                user.delete()
                return Response({'message': 'User declined and email sent.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        except USER.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

# Edit and Delete the user profile
class ProfileOperations(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        data = request.data
        profile_img = request.FILES.get('profile_img', None)

        serializer = UserRegistrationSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            if profile_img:
                user.profile_img = profile_img
                user.save()
            serializer.save()
            return Response({"message": "Profile updated successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request):
        try:
            user = request.user
            user.delete()
            return Response({'message':'Your account has been deleted successfully.'},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':'There was an error deleting your account.'},status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ResetPasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        oldpass_entered = request.data.get('oldPassword')
        user = request.user

        if user.check_password(oldpass_entered):
            return Response({'message': 'Password is verified'}, status=200)
        else:
            return Response({'message': 'Invalid Password'}, status=400)

    def put(self, request):
        newpass_entered = request.data.get('newPassword')
        user_id = request.user.id  

        try:
        
            user = USER.objects.get(id=user_id)
            user.set_password(newpass_entered)
            user.save()

            send_mail(
                'Password Change Notification',
                'Your password has been successfully changed.',
                'alengeorge1999@gmail.com',  
                [user.email],  
                fail_silently=False,
            )

            return Response({'message': 'Password updated successfully'}, status=200)
        except USER.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=400)