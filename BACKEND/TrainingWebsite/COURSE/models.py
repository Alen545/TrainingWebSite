from django.db import models

# Create your models here.
class COURSE(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=3)
    trial_video = models.FileField(upload_to='trial_videos/',null=True, blank=True)
    course_photo = models.ImageField(upload_to='course_photos/', null=True, blank=True)
    
    def __str__(self):
        return self.title

