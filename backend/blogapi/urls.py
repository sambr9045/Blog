from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.CategoryListView.as_view(), name="category-list"),
    path("articles/", views.BlogpostListVIew.as_view(), name="article-list"),
    path(
        "articles/<str:category_slug>",
        views.BlogpostListVIew.as_view(),
        name="article-list-by-category",
    ),
    path(
        "article/<slug:slug>", views.BLopostDetailsView.as_view(), name="article-detail"
    ),
    path("tags/", views.TagListView.as_view(), name="tags-list"),
    path("search", views.SearchView.as_view(), name="seache-list"),
    path(
        "article-viewcount-update/",
        views.UpdateViewsCountView.as_view(),
        name="article-views-count-update",
    ),
    path("mostviewed/", views.MostviewedView.as_view(), name="mostviews-list"),
    path("recentarticle/", views.RecentArticleView.as_view(), name="recent-article"),
]
