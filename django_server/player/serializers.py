from rest_framework import serializers
from .models import Audio
from django.contrib.auth.models import User, Group


class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ('url', 'username', 'email', 'groups')

class AudioSerialiser(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Audio
    fields = ('id', 'title', 'author', 'src')
