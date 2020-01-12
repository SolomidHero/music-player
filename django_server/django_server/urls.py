"""django_server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
  https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
  1. Add an import:  from my_app import views
  2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
  1. Add an import:  from other_app.views import Home
  2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
  1. Import the include() function: from django.urls import include, path
  2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from player import views, api
from rest_framework_simplejwt.views import (
  TokenObtainPairView,
  TokenRefreshView,
)


router = routers.DefaultRouter()
router.register('api/users', views.UserViewSet)
router.register('api/profile', views.ProfileViewSet)
router.register('api/audio', views.AudioViewSet, base_name='audio')
router.register('api/musicians', views.MusicianViewSet)

urlpatterns = [
  path('admin/', admin.site.urls),
  path('', include(router.urls)),
  path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
  path('api/auth/register/', api.RegistrationAPI.as_view()),
  path('api/auth/login/', api.LoginAPI.as_view()),
  path('api/auth/logout/', api.LogoutAPI.as_view()),
  path('api/auth/user/', api.UserAPI.as_view()),
  path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]
