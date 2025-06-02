from django.conf import settings
from django.http import FileResponse, Http404
import os

def serve_blog_image(request, filename):
    image_path = os.path.join(settings.MEDIA_ROOT, 'blog_images', filename)
    if os.path.exists(image_path):
        return FileResponse(open(image_path, 'rb'), content_type='image/png')
    raise Http404("Image not found")


def serve_resume(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, 'resume', filename)
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'), content_type='application/pdf')
    raise Http404("Resume not found")
