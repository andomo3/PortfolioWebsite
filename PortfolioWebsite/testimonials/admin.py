from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'role', 'approved', 'created_at')
    list_filter = ('approved', 'created_at')
    search_fields = ('author_name', 'quote', 'role')
    list_editable = ('approved',)
