from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Page, PageVersion, MediaAsset
from .serializers import PageSerializer, PageVersionSerializer, MediaAssetSerializer
from .permissions import IsStaff


def blank_layout():
    return {"blocks": []}


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.all().order_by("slug")
    serializer_class = PageSerializer
    permission_classes = [IsStaff]
    lookup_field = "slug"

    @action(detail=True, methods=["get"])
    def draft(self, request, slug=None):
        page = self.get_object()
        published = page.versions.filter(is_published=True).order_by("-created_at").first()
        if published:
            return Response(PageVersionSerializer(published).data)

        latest = page.versions.order_by("-created_at").first()
        if latest:
            return Response(PageVersionSerializer(latest).data)

        return Response(
            {
                "id": None,
                "page": page.id,
                "page_slug": page.slug,
                "version_number": 0,
                "layout_json": blank_layout(),
                "is_published": False,
                "created_at": None,
            }
        )

    @action(detail=True, methods=["get"])
    def versions(self, request, slug=None):
        page = self.get_object()
        versions = page.versions.all()
        return Response(PageVersionSerializer(versions, many=True).data)

    @action(detail=True, methods=["post"])
    def save(self, request, slug=None):
        page = self.get_object()
        layout_json = request.data.get("layout_json")
        if not isinstance(layout_json, dict):
            return Response(
                {"detail": "layout_json must be an object"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        latest = page.versions.order_by("-version_number").first()
        next_version = 1 if not latest else latest.version_number + 1

        pv = PageVersion.objects.create(
            page=page,
            version_number=next_version,
            layout_json=layout_json,
            is_published=False,
            created_by=request.user,
        )
        return Response(PageVersionSerializer(pv).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["post"])
    def publish(self, request, slug=None):
        page = self.get_object()
        version_id = request.data.get("version_id")
        if not version_id:
            return Response(
                {"detail": "version_id is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        pv = get_object_or_404(PageVersion, id=version_id, page=page)

        with transaction.atomic():
            PageVersion.objects.filter(page=page, is_published=True).update(
                is_published=False
            )
            pv.is_published = True
            pv.save(update_fields=["is_published"])

        return Response(PageVersionSerializer(pv).data, status=status.HTTP_200_OK)


class MediaAssetViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = MediaAsset.objects.all().order_by("-uploaded_at")
    serializer_class = MediaAssetSerializer
    permission_classes = [IsStaff]
