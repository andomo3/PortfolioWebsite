from django.urls import path
from . import views

app_name = 'resume'

urlpatterns = [
    path('', views.resume_view, name='resume'),
    path('download/', views.download_resume, name='download_resume'),
]
