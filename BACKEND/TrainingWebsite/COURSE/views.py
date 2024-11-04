from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import COURSE
from .serializers import CourseSerializer

# List all courses or create a new course
class CourseListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        courses = COURSE.objects.all()
        course_data = []
        for course in courses:
            course_data.append({
                'id': course.id,
                'title': course.title,
                'description': course.description,
                'duration': course.duration,
                'price': course.price,
                'course_photo': request.build_absolute_uri(course.course_photo.url) if course.course_photo else None,
                'trial_video': request.build_absolute_uri(course.trial_video.url) if course.trial_video else None
            })

        return Response(course_data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
        serializer = CourseSerializer(course, data=request.data)
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
