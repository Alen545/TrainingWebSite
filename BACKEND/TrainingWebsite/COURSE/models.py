from django.db import models

# Create your models here.
class COURSE(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=3)
    course_photo = models.ImageField(upload_to='course_photos/', null=True, blank=True)
    
    def __str__(self):
        return self.title

class TRIALVIDEO(models.Model):
    # ForeignKey links each trial video to a specific course(One To Many)
    course = models.ForeignKey(
        COURSE, 
        related_name="trial_videos",  # Allows us to access a course's trial videos via course.trial_videos.
        on_delete=models.CASCADE  # Deletes all related trial videos if the course is deleted.
    )
    video = models.FileField(upload_to='trial_videos/')

    def __str__(self):
        return f"Video for {self.course.title}"


