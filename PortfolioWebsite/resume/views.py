from django.shortcuts import render
from django.http import FileResponse
import os
from django.conf import settings

def resume_view(request):
    return render(request, 'resume/resume.html')

def download_resume(request):
    filepath = os.path.join(settings.MEDIA_ROOT, 'resume', 'Abba_Resume.pdf')
    return FileResponse(open(filepath, 'rb'), as_attachment=True, filename='Abba_Resume.pdf')
