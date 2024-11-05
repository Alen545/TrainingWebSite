from rest_framework import serializers
from .models import COURSE, TRIALVIDEO

class TrialVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TRIALVIDEO
        fields = ['id','video']

class CourseSerializer(serializers.ModelSerializer):
    # Using TrialVideoSerializer here allows us to include detailed information (id, video, etc.) 
    # for each related trial video instead of just their IDs.
    trial_videos = TrialVideoSerializer(many=True, read_only=True)

    class Meta:
        model = COURSE
        fields = ['id', 'title', 'description', 'duration', 'price', 'course_photo', 'trial_videos']
