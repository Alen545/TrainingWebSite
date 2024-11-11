from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import COURSE, TRIALVIDEO, COURSEINTEREST, COURSEAPPLICATION
from .serializers import CourseSerializer, CourseSerializer
from django.core.mail import send_mail

# List all courses or create a new course
class CourseListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = COURSE.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        
        if serializer.is_valid():
            course = serializer.save()
            
            # Check if video files are provided in the request
            if 'video' not in request.FILES:
                return Response({'error': 'Video file is required'}, status=status.HTTP_400_BAD_REQUEST)

            # Save each uploaded video file as a TRIALVIDEO associated with the course
            for video_file in request.FILES.getlist('video'):
                TRIALVIDEO.objects.create(course=course, video=video_file)
            
            return Response({
                'message': 'Course and trial videos added successfully',
                'course': serializer.data
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve, update, or delete a specific course
class CourseDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, course_id):
        try:
            return COURSE.objects.get(id=course_id)
        except COURSE.DoesNotExist:
            return None

    def get(self, request, course_id):
        course = self.get_object(course_id)
        if course is None:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def put(self, request, course_id):
        course = self.get_object(course_id)
        if course is None:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, course_id):
        course = self.get_object(course_id)

        if course is None:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        course.delete()
        return Response({'message': 'Course deleted successfully'}, status=status.HTTP_204_NO_CONTENT)

class AddTrialVideoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, course_id):
        course = COURSE.objects.get(id=course_id)

        # Check if any video(key value) are present in the request
        if 'video' not in request.FILES:
            return Response({'error': 'Video file is required'},status=status.HTTP_400_BAD_REQUEST)
        
        # Save each video as a TRIALVIDEO instance
        for video_file in request.FILES.getlist('video'):
            TRIALVIDEO.objects.create(course=course, video=video_file)
        
        return Response({'message': 'Trial videos added successfully'},status=status.HTTP_201_CREATED)
    
class RemoveTrialVideoView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, video_id):
        try:
            video = TRIALVIDEO.objects.get(id=video_id)
            video.delete()
            return Response({'message': 'Trial video deleted successfully'},status=status.HTTP_204_NO_CONTENT)
        except TRIALVIDEO.DoesNotExist:
            return Response({'error': 'Trial video not found'},status=status.HTTP_404_NOT_FOUND)


class CourseInterestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        course_id = request.query_params.get('course')
        
        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            course = COURSE.objects.get(id=course_id)
        except COURSE.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        
        interest = COURSEINTEREST.objects.filter(user=user, course=course).first()
        
        if interest:
            return Response({"interested": interest.interested}, status=status.HTTP_200_OK)
        else:
            return Response({"interested": False}, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        course_id = request.data.get('course')
        
        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = COURSE.objects.get(id=course_id)
        except COURSE.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        interest, created = COURSEINTEREST.objects.get_or_create(user=user, course=course)
        
        if not created:
            interest.interested = True
            interest.save()

        return Response({"message": "Interest recorded successfully."}, status=status.HTTP_200_OK) 


class CourseApplyView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        course_id = request.query_params.get('course')
        
        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            course = COURSE.objects.get(id=course_id)
        except COURSE.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        
        applied = COURSEAPPLICATION.objects.filter(user=user, course=course).exists()
        
        return Response({"applied": applied}, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        course_id = request.data.get('course')
        
        if not course_id:
            return Response({'error': 'Course ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = COURSE.objects.get(id=course_id)
        except COURSE.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        if COURSEAPPLICATION.objects.filter(user=user, course=course).exists():
            return Response({'error': 'You have already applied for this course.'}, status=status.HTTP_400_BAD_REQUEST)

        application = COURSEAPPLICATION.objects.create(user=user, course=course)

        subject = "HR will connect with you shortly"
        message = f"Dear {user.first_name} { user.last_name},\n\nThank you for your interest in the {course.title} course. HR will be contacting you shortly."
        recipient_list = [user.email]
        send_mail(subject, message, 'alengeorge1999@gmail.com', recipient_list)

        return Response({"message": "Application successful. HR will contact you shortly."}, status=status.HTTP_200_OK)