from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from . import models
from . import serializers
from django.db.models import F
import json

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
        elif (
            request.query_params.get("limit")
            and request.query_params.get("limit") is not None
        ):
            limit = int(request.query_params["limit"])
            articles = models.BlogPost.objects.order_by("created_at")[: int(limit)]
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
        # Perform the search query
        articles = models.BlogPost.objects.filter(title__icontains=query)
        # Serialize the results
        serializer = serializers.BlogpostSerializer(articles, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class MostviewedView(APIView):
    def get(self, request, format=None):
        query = models.BlogPost.objects.order_by("-views_count")[:10]
        serializer = serializers.BlogpostSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RecentArticleView(APIView):
    def get(self, request, format=None):
        query = models.BlogPost.objects.order_by("-created_at")[:10]
        serializer = serializers.BlogpostSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@method_decorator(csrf_exempt, name="dispatch")
class UpdateViewsCountView(APIView):
    def post(self, request, format=None):
        try:
            data = json.loads(request.body)

            article = models.BlogPost.objects.filter(pk=data.get("id")).update(
                views_count=F("views_count") + 1
            )

            return Response({"status": "done"}, status=status.HTTP_200_OK)
        except models.BlogPost.DoesNotExist:
            return Response(
                {"message": "Blog post does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
