from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from player.models import Musician, Audio, Profile
from django.contrib.auth.models import User


class ProfileInline(admin.StackedInline):
  model = Profile
  can_delete = False
  verbose_name_plural = 'Profile'


class CustomUserAdmin(BaseUserAdmin):
  inlines = (ProfileInline, )

  # def get_inline_instances(self, request, obj=None):
  #   if not obj:
  #     return list()
  #   return super(CustomUserAdmin, self).get_inline_instances(request, obj)

# Register your models here.
admin.site.register(Musician)
admin.site.register(Audio)
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
