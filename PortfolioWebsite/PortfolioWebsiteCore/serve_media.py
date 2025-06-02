from django.conf import settings
from django.http import FileResponse, Http404
import os

def serve_resume(request, filename):
    file_path = os.path.join(settings.MEDIA_ROOT, 'resume', filename)
    if os.path.exists(file_path):
        return FileResponse(open(file_path, 'rb'), content_type='application/pdf')
    raise Http404("Resume not found")
