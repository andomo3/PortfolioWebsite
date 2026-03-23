from django.db import models
from django.utils.text import slugify
import markdown


class Project(models.Model):
    # Core
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    featured = models.BooleanField(default=False, help_text="Show on the home/projects grid")

    # Content
    summary = models.TextField(
        blank=True,
        help_text="One or two sentences shown on the project card. Plain text."
    )
    body = models.TextField(
        blank=True,
        help_text="Full project description shown on the detail page. Markdown supported."
    )

    # Links
    tech_stack = models.CharField(
        max_length=300, blank=True,
        help_text="Comma-separated: Python, React, PostgreSQL"
    )
    project_url = models.URLField(blank=True, null=True, help_text="Live demo or external link")
    github_url = models.URLField(blank=True, null=True, help_text="GitHub repo URL")

    # Media — upload an image OR paste an embed code, not both
    image = models.ImageField(
        upload_to='project_images/', blank=True, null=True,
        help_text="Upload a preview image. Appears on the card and at the top of the detail page."
    )
    embed_code = models.TextField(
        blank=True, null=True,
        help_text=(
            "Paste a full iframe/embed snippet here (YouTube, GitHub Gist, Figma, etc.). "
            "Used on the detail page instead of the image if both are provided."
        )
    )

    # Legacy — kept for backwards compatibility, not shown in admin forms
    description = models.TextField(blank=True)
    preview_media_asset = models.ForeignKey(
        "builder.MediaAsset",
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="project_previews",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        # Mirror summary→description for any legacy code that reads description
        if self.summary and not self.description:
            self.description = self.summary
        super().save(*args, **kwargs)

    def get_tech_list(self):
        return [t.strip() for t in self.tech_stack.split(',') if t.strip()]

    def render_body(self):
        content = self.body or self.description
        return markdown.markdown(content, extensions=['fenced_code', 'codehilite', 'tables'])

    def card_summary(self):
        """Text shown on the project grid card."""
        return self.summary or self.description

    def __str__(self):
        return self.title


class WorkExperience(models.Model):
    title = models.CharField(max_length=200, help_text="Your role/position title")
    company = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True, help_text="Team, department, or short tagline")
    duration = models.CharField(max_length=100, blank=True, help_text="e.g. May 2024 – Aug 2024")
    overview = models.TextField(blank=True, help_text="Short description of the role (markdown supported)")
    what_built = models.TextField(blank=True, help_text="What you built — one bullet per line (markdown supported)")
    impact = models.TextField(blank=True, help_text="Outcomes and impact — one bullet per line (markdown supported)")
    tech_stack = models.JSONField(default=list, blank=True, help_text='List of technologies, e.g. ["Python", "React"]')
    slug = models.SlugField(max_length=200, unique=True, blank=True, help_text="Used for the detail page URL (/p/internships/{slug}/)")
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first")
    featured = models.BooleanField(default=True, help_text="Show in the featured list on the home/experience page")
    image = models.ImageField(upload_to='experience_images/', blank=True, null=True, help_text="Optional preview image")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        verbose_name = "Work Experience"
        verbose_name_plural = "Work Experiences"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.company}-{self.title}")
        super().save(*args, **kwargs)

    def render_overview(self):
        return markdown.markdown(self.overview, extensions=['fenced_code']) if self.overview else ""

    def get_highlights(self):
        return [line.strip() for line in self.what_built.splitlines() if line.strip()]

    def get_impact_lines(self):
        return [line.strip() for line in self.impact.splitlines() if line.strip()]

    def __str__(self):
        return f"{self.title} @ {self.company}"
