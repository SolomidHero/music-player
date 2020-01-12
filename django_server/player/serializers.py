from rest_framework import serializers
from .models import Audio, Musician, Profile
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate


class LoginUserSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError(
      "Unable to log in with provided credentials.")


class CreateUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(
      validated_data['username'],
      validated_data['email'],
      validated_data['password']
    )
    return user


class UserSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'is_superuser', 'email')


class AudioSerializer(serializers.HyperlinkedModelSerializer):
  url = serializers.HyperlinkedIdentityField(view_name="audio-detail")

  class Meta:
    model = Audio
    fields = ('id', 'url', 'title', 'artist', 'src')


class MusicianSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Musician
    fields = ('first_name', 'last_name')


class ProfileSerializer(serializers.HyperlinkedModelSerializer):
  class Meta:
    model = Profile
    fields = ('playlist', )
