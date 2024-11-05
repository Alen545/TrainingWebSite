# Generated by Django 5.1.2 on 2024-11-05 05:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('COURSE', '0002_course_course_photo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='trial_video',
        ),
        migrations.CreateModel(
            name='TRIALVIDEO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(upload_to='trial_videos/')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trial_videos', to='COURSE.course')),
            ],
        ),
    ]
