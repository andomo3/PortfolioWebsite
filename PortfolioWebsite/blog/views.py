from django.shortcuts import render
from .models import BlogPost
from django.shortcuts import get_object_or_404

def post_list(request):
    posts = BlogPost.objects.all().order_by('-created_at')
    return render(request, 'blog/post_list.html', {'posts': posts})


def post_detail(request, slug):
    post = get_object_or_404(BlogPost, slug=slug)
    return render(request, 'blog/post_detail.html', {'post': post})