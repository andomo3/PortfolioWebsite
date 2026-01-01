from django.contrib import admin
from .models import Page, PageVersion, MediaAsset


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("slug", "title", "updated_at")
    search_fields = ("slug", "title")


@admin.register(PageVersion)
class PageVersionAdmin(admin.ModelAdmin):
    list_display = ("page", "version_number", "is_published", "created_at")
    list_filter = ("is_published", "page")
    search_fields = ("page__slug",)


@admin.register(MediaAsset)
class MediaAssetAdmin(admin.ModelAdmin):
    list_display = ("file", "uploaded_by", "uploaded_at")
