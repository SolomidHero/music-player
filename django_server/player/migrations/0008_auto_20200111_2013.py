# Generated by Django 3.0 on 2020-01-11 20:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('player', '0007_auto_20200111_2006'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='nick',
        ),
        migrations.AddField(
            model_name='profile',
            name='playlist',
            field=models.ManyToManyField(to='player.Audio'),
        ),
    ]
