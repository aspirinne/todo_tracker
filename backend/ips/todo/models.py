from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    """Model for task"""
    description = models.TextField()
    complete = models.BooleanField(default=False)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    periodic = models.BooleanField(default=False)
    parent_task = models.ForeignKey('self', on_delete=models.CASCADE, related_name='inner_tasks', null=True, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='this_user_tasks')
