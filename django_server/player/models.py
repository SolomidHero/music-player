from django.db import models


class Musician(models.Model):
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)


class Audio(models.Model):
  artist = models.ForeignKey(
    Musician, on_delete=models.CASCADE, related_name='audio')
  name = models.CharField(max_length=100)
  release_date = models.DateField()
  num_stars = models.IntegerField()
