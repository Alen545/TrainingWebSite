from django.urls import path
from . import views  

urlpatterns = [
    path('course-list/', views.CourseListView.as_view(), name='list_or_add_course'),  
    path('course-detail/<int:course_id>/', views.CourseDetailView.as_view(), name='retrieve_update_delete_course'), 
    path('add-trial-video/<int:course_id>/', views.AddTrialVideoView.as_view(), name='add-trial-video'),
    path('remove-trial-video/<int:video_id>/', views.RemoveTrialVideoView.as_view(), name='remove-trial-video'),
    path('interest/', views.CourseInterestView.as_view(), name='course-interest'),
    path('apply/', views.CourseApplyView.as_view(), name='course-apply'),
]

