from django.contrib import admin

from player.models import Musician
from player.models import Audio
# from django.contrib.auth.models import User

# Register your models here.
admin.site.register(Musician)
admin.site.register(Audio)
# admin.site.register(User)
