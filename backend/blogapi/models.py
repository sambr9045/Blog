from django.db import models
from ckeditor.fields import RichTextField
from django.utils.text import slugify
from django.utils import timezone
from PIL import Image


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Tag, self).save(*args, **kwargs)

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField(max_length=300)
    article = RichTextField()  # Use RichTextField instead of TextField
    description = models.TextField(default="None", blank=False, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, max_length=300)
    image = models.ImageField(upload_to="media/blog_images/")
    thumbnail = models.ImageField(
        upload_to="media/blog_thumbnails/", blank=True, max_length=300
    )
    views_count = models.PositiveIntegerField(default=0)
    slug = models.SlugField(
        unique=True, blank=True, max_length=300
    )  # Add the slug field
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)

        # Call the parent class' save method
        super(BlogPost, self).save(*args, **kwargs)

        # Create and save the thumbnail
        if not self.thumbnail:  # Only create a thumbnail if it doesn't exist
            self.create_thumbnail()

    def create_thumbnail(self):
        # Open the original image
        img = Image.open(self.image.path)

        # Define the thumbnail size (adjust as needed)
        thumbnail_size = (300, 300)

        # Create the thumbnail
        img.thumbnail(thumbnail_size)

        # Save the thumbnail
        thumbnail_path = f"media/blog_thumbnails/thumbnail_{self.slug}.jpg"
        img.save(thumbnail_path)

        # Update the model's thumbnail field with the path
        self.thumbnail = thumbnail_path

        # Save the model again to update the thumbnail field
        self.save()

    def __str__(self):
        return self.title


class BlogComment(models.Model):
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE)
    content = models.TextField()
    name = models.TextField(default=None)
    approved = models.BooleanField(default=False)
    email = models.EmailField(default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment on {self.blog_post.title}"
