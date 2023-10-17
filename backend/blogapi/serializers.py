from rest_framework import serializers
from .models import Tag, BlogPost, BlogComment, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]

    def create(self, validated_data):
        """Create and return Category"""
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """Update and retunr category models"""
        instance.name = validated_data.get("name", instance.name)
        instance.slug = validated_data.get("slug", instance.slug)

        instance.save()
        return instance


class BlogpostSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source="category.name")

    class Meta:
        model = BlogPost
        fields = [
            "id",
            "title",
            "article",
            "description",
            "category",
            "category_name",
            "tags",
            "image",
            "thumbnail",
            "slug",
            "created_at",
        ]


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name", "slug"]
