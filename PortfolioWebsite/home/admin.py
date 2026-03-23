from django.contrib import admin
from django.utils.html import format_html
from .models import SiteImage


@admin.register(SiteImage)
class SiteImageAdmin(admin.ModelAdmin):
    list_display = ["label", "key", "preview"]
    fields = ["label", "key", "image"]

    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="height:48px; border-radius:4px; object-fit:cover;">',
                obj.image.url,
            )
        return "—"
    preview.short_description = "Preview"
