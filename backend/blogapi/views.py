from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from . import models
from . import serializers

import time


class CategoryListView(APIView):
    def get(self, request, format=None):
        categories = models.Category.objects.all()

        serializer = serializers.CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlogpostListVIew(APIView):
    def get(self, request, category_slug=None, format=None):
        if category_slug is not None:
            articles = models.BlogPost.objects.filter(category__slug=category_slug)
        else:
            articles = models.BlogPost.objects.all()
        serializer = serializers.BlogpostSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# sindle article view
class BLopostDetailsView(generics.RetrieveAPIView):
    queryset = models.BlogPost.objects.all()
    serializer_class = serializers.BlogpostSerializer
    lookup_field = "slug"


class TagListView(generics.ListAPIView):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagsSerializer


class SearchView(APIView):
    def get(self, request, format=None):
        query = request.query_params.get("q", "")
        print(query)
        # Perform the search query
        articles = models.BlogPost.objects.filter(title__icontains=query)
        # Serialize the results
        serializer = serializers.BlogpostSerializer(articles, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
