"""
URL configuration for PortfolioWebsite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .serve_media import serve_resume


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),  # root path
    path('projects/', include('projects.urls')),
    path('blog/', include('blog.urls')),
    path('testimonials/', include('testimonials.urls')),
    path('resume/', include('resume.urls')),
    path('contact/', include('contact.urls')),
    path('media/resume/<str:filename>', serve_resume, name='serve_resume'),
]


# ✅ Append this outside the urlpatterns list    
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)