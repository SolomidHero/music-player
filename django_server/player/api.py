from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from .models import Audio
from .serializers import AudioSerializer, CreateUserSerializer,\
    LoginUserSerializer, UserSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class LoginAPI(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny, )
  serializer_class = LoginUserSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    tokens = RefreshToken.for_user(user)

    return Response({
      'user': UserSerializer(user, context=self.get_serializer_context()).data,
      'refresh': str(tokens),
      'access': str(tokens.access_token),
    })


class LogoutAPI(generics.GenericAPIView):
  permission_classes = (permissions.IsAuthenticated, )
  serializer_class = LoginUserSerializer

  def post(self, request, *args, **kwargs):
    return Response({
      'user': None,
      'refresh': None,
      'access': None
    })


class RegistrationAPI(generics.GenericAPIView):
  permission_classes = (permissions.AllowAny, )
  serializer_class = CreateUserSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    tokens = RefreshToken.for_user(user)

    return Response({
      'user': UserSerializer(user, context=self.get_serializer_context()).data,
      'refresh': str(tokens),
      'access': str(tokens.access_token),
    })



class UserAPI(generics.RetrieveAPIView):
  permission_classes = (permissions.IsAuthenticated, )
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
