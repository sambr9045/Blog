# Generated by Django 4.2.5 on 2023-10-16 11:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blogapi", "0006_alter_blogpost_image_alter_blogpost_thumbnail"),
    ]

    operations = [
        migrations.AddField(
            model_name="blogpost",
            name="description",
            field=models.TextField(default=None),
        ),
    ]
