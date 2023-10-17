from django.contrib import admin

# Register your models here.

from .models import Category, Tag, BlogPost, BlogComment


class BlogPostAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "views_count"]
    prepopulated_fields = {"slug": ("title",)}

    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "tags":
            kwargs["widget"] = admin.widgets.FilteredSelectMultiple(
                db_field.verbose_name, False
            )
        return super().formfield_for_manytomany(db_field, request, **kwargs)


# Register your models here
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(BlogComment)
