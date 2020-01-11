# Generated by Django 3.0 on 2020-01-11 17:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('player', '0002_audio_owner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='audio',
            old_name='name',
            new_name='title',
        ),
        migrations.AddField(
            model_name='audio',
            name='src',
            field=models.CharField(default='somesrc', max_length=256),
            preserve_default=False,
        ),
    ]
