from django.db import models
import markdown

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.CharField(max_length=300)
    project_url = models.URLField(blank=True, null=True)
    preview_media_asset = models.ForeignKey(
        "builder.MediaAsset",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="project_previews",
    )
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    embed_code = models.TextField(blank=True, null=True)  # ✅ NEW FIELD
    featured = models.BooleanField(default=False)

    def render_description(self):
        return markdown.markdown(self.description, extensions=['fenced_code', 'codehilite'])
    
    def __str__(self):
        return self.title
