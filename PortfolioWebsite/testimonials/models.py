from django.db import models

class Testimonial(models.Model):
    author_name = models.CharField(max_length=100)
    role = models.CharField(max_length=150, blank=True)
    quote = models.TextField()
    profile_image = models.ImageField(upload_to='testimonial_images/', blank=True, null=True)
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    embed_code = models.TextField(blank=True, null=True)  # For YouTube, SoundCloud, etc.

    def __str__(self):
        return f"{self.author_name} ({'Approved' if self.approved else 'Pending'})"
