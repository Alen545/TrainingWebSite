from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import COURSE, TRIALVIDEO
from .serializers import CourseSerializer, CourseSerializer

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