from django.shortcuts import render
from .models import Testimonial

def testimonial_list(request):
    testimonials = Testimonial.objects.filter(approved=True).order_by('-created_at')
    return render(request, 'testimonials/testimonial_list.html', {'testimonials': testimonials})
