from rest_framework import serializers
from django.contrib.auth.models import User, Group
from .models import Task


# -----------------------------------------------------------------------------------
# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'is_staff')


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')
# -----------------------------------------------------------------------------------


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer to map the Task.Model instance into JSON format."""

    class Meta:
        """Meta class to map serializer's fields with the Task.model fields."""

        model = Task
        fields = '__all__'
