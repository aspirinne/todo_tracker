# from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.reverse import reverse
from rest_framework.response import Response
from rest_framework import viewsets
from django.contrib.auth.models import User, Group
from .serializers import TaskSerializer, UserSerializer, GroupSerializer
from .models import Task


# Create your views here.
@api_view(['GET'])
def api_root(request):
    """The entry endpoint of API."""
    return Response({
        'tasks': reverse('task-list', request=request),
        # 'pizzas': reverse('pizza-list', request=request),
        # 'customers': reverse('customer-list', request=request),
    })


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class TaskViewSet(viewsets.ModelViewSet):
    """API endpoint that represents a list of Tasks."""

    model = Task
    serializer_class = TaskSerializer
