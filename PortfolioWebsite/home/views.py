from django.shortcuts import render
from projects.models import Project

def index(request):
    featured_projects = Project.objects.filter(featured=True).order_by('-created_at')[:3]
    return render(request, 'home/index.html', {
        'featured_projects': featured_projects
    })