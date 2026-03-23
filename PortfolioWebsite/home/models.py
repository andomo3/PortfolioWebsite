from django.db import models


class SiteImage(models.Model):
    """
    Named image slots for the site. Each entry has a key that matches
    the 'mediaUrl' prop on a hero/media block in the Studio page builder.

    Examples:
      key="headshot"      → home page hero photo
      key="about-photo-1" → first about page photo
      key="about-photo-2" → second about page photo

    To find a block's key: check its mediaUrl value in the Studio editor.
    Uploading a new image here instantly updates every page that uses that key.
    """

    key = models.SlugField(
        unique=True,
        help_text=(
            "Must match the block's mediaUrl value exactly "
            "(e.g. 'headshot', 'about-photo-1'). Check the Studio editor to find it."
        ),
    )
    label = models.CharField(
        max_length=100,
        help_text="Friendly name shown in admin (e.g. 'Home Page Headshot').",
    )
    image = models.ImageField(
        upload_to="site/",
        help_text="Upload the image. Replaces the old static file on all pages using this key.",
    )

    class Meta:
        verbose_name = "Site Image"
        verbose_name_plural = "Site Images"
        ordering = ["key"]

    def __str__(self):
        return f"{self.label} ({self.key})"
