from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User, Group

from .models import Audio, Musician, Profile
from .serializers import AudioSerialiser, UserSerializer,\
    MusicianSerialiser, ProfileSerialiser

from rest_framework import viewsets, permissions


class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all().order_by('-date_joined')
  serializer_class = UserSerializer


class AudioViewSet(viewsets.ModelViewSet):
  permission_classes = [
    # permissions.IsAuthenticated,
    permissions.AllowAny,
  ]
  serializer_class = AudioSerialiser
  queryset = Audio.objects.all()

  # def get_queryset(self):
  #   return self.request.user.profile.playlist.all()

  # def perform_create(self, serializer):
  #   serializer.save(owner=self.request.user)


class MusicianViewSet(viewsets.ModelViewSet):
  queryset = Musician.objects.all()
  permission_classes = [
    permissions.AllowAny,
  ]
  serializer_class = MusicianSerialiser


class ProfileViewSet(viewsets.ModelViewSet):
  queryset = Profile.objects.all()
  permission_classes = [
      permissions.AllowAny,
  ]
  serializer_class = ProfileSerialiser
