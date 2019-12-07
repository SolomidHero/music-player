from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User, Group
from .models import Audio, Musician
from .serializers import AudioSerialiser, UserSerializer

from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all().order_by('-date_joined')
  serializer_class = UserSerializer

class AudioViewSet(viewsets.ModelViewSet):
  queryset = Audio.objects.all()
  serializer_class = AudioSerialiser
