# Generated by Django 4.2.5 on 2023-10-16 11:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("blogapi", "0005_alter_blogpost_thumbnail"),
    ]

    operations = [
        migrations.AlterField(
            model_name="blogpost",
            name="image",
            field=models.ImageField(upload_to="media/blog_images/"),
        ),
        migrations.AlterField(
            model_name="blogpost",
            name="thumbnail",
            field=models.ImageField(
                blank=True, max_length=300, upload_to="media/blog_thumbnails/"
            ),
        ),
    ]