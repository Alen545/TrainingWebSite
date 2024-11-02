from rest_framework import serializers
from .models import COURSE

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = COURSE
        fields = ['id','title','description','duration','price','trial_video','course_photo']