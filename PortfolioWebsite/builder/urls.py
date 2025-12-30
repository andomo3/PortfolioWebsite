from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import PageViewSet, MediaAssetViewSet
from .views import studio_page, public_page, project_public_page

router = DefaultRouter()
router.register(r"builder/pages", PageViewSet, basename="builder-pages")
router.register(r"builder/assets", MediaAssetViewSet, basename="builder-assets")

urlpatterns = [
    path("api/", include(router.urls)),
    path("studio/pages/<slug:slug>/", studio_page, name="studio_page"),
    path("p/projects/<slug:slug>/", project_public_page, name="project_public_page"),
    path("p/<slug:slug>/", public_page, name="public_page"),
]
