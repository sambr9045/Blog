from rest_framework.pagination import PageNumberPagination
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.filters import SearchFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from . import models
from . import serializers
from django.db.models import F
import json, time


class CategoryListView(APIView):
    def get(self, request, format=None):
        categories = models.Category.objects.all()

        serializer = serializers.CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class BlogpostListVIew(APIView):
    def get(self, request, category_slug=None, format=None):
        query = request.query_params.get("query")

        if category_slug is not None:
            articles = models.BlogPost.objects.filter(category__slug=category_slug)
        elif (
            request.query_params.get("limit")
            and request.query_params.get("limit") is not None
        ):
            limit = int(request.query_params["limit"])
            articles = models.BlogPost.objects.order_by("created_at")[: int(limit)]

        elif query is not None and query == "mostpopular":
            articles = models.BlogPost.objects.order_by("-views_count")

        else:
            articles = models.BlogPost.objects.all()

        page = request.query_params.get(
            "page", 1
        )  # Get the requested page from query params
        page_size = 15  # Set the number of items per page
        start_index = (int(page) - 1) * page_size  # Convert page to int
        end_index = start_index + page_size

        serializer = serializers.BlogpostSerializer(
            articles[start_index:end_index], many=True
        )
        return Response(
            {
                "results": serializer.data,
                "next": f"?page={int(page) + 1}" if end_index < len(articles) else None,
            },
            status=status.HTTP_200_OK,
        )


# sindle article view
class BLopostDetailsView(generics.RetrieveAPIView):
    queryset = models.BlogPost.objects.all()
    serializer_class = serializers.BlogpostSerializer
    lookup_field = "slug"


class TagListView(generics.ListAPIView):
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagsSerializer


class BlogPostSearchFilter(SearchFilter):
    search_param = "q"


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 15  # Set the number of items per page


class SearchView(generics.ListAPIView):
    queryset = models.BlogPost.objects.all()
    serializer_class = serializers.BlogpostSerializer
    filter_backends = [BlogPostSearchFilter]
    search_fields = ["title"]
    pagination_class = CustomPageNumberPagination  # Set the pagination class

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get("q", "")
        if query:
            queryset = queryset.filter(title__icontains=query)
        return queryset


# class SearchView(APIView):
#     def get(self, request, format=None):
#         query = request.query_params.get("q", "")
#         # Perform the search query
#         articles = models.BlogPost.objects.filter(title__icontains=query)
#         # Serialize the results
#         serializer = serializers.BlogpostSerializer(articles, many=True)

#         return Response(serializer.data, status=status.HTTP_200_OK)


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
