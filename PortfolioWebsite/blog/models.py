from django.db import models
from django.utils.text import slugify
import markdown

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    featured_image = models.ImageField(upload_to='blog_images/', blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def render_markdown(self):
        return markdown.markdown(
            self.content,
            extensions=['fenced_code', 'codehilite', 'md_in_html']
        )

    def __str__(self):
        return self.title
