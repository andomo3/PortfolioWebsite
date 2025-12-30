from rest_framework import serializers
from .models import Page, PageVersion, MediaAsset


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ['id', 'slug', 'title', 'created_at', 'updated_at']


class PageVersionSerializer(serializers.ModelSerializer):
    page_slug = serializers.CharField(source='page.slug', read_only=True)

    class Meta:
        model = PageVersion
        fields = [
            'id',
            'page',
            'page_slug',
            'version_number',
            'layout_json',
            'is_published',
            'created_at',
        ]


class MediaAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = MediaAsset
        fields = ['id', 'file', 'alt_text', 'meta', 'uploaded_at']
