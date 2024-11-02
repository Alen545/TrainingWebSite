from django.urls import path
from . import views  

urlpatterns = [
    path('course-list/', views.CourseListView.as_view(), name='list_or_add_course'),  
    path('course-detail/<int:course_id>/', views.CourseDetailView.as_view(), name='retrieve_update_delete_course'),  
]