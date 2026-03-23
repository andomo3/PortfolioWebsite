from django.db import migrations, models
import django.db.models.functions


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0005_project_preview_media_asset"),
    ]

    operations = [
        # Add slug to Project (blank=True so existing rows don't break)
        migrations.AddField(
            model_name="project",
            name="slug",
            field=models.SlugField(blank=True, unique=False),
        ),
        # Populate slugs for existing projects from their titles
        migrations.RunSQL(
            sql="""
                UPDATE projects_project
                SET slug = lower(
                    replace(replace(replace(replace(replace(replace(replace(
                        replace(replace(replace(replace(replace(
                            replace(title, ' ', '-'),
                        '.', ''), ',', ''), ':', ''), ';', ''), '(', ''), ')', ''),
                        '[', ''), ']', ''), '/', ''), '\\', ''), '&', ''), '!', '')
                )
                WHERE slug = '';
            """,
            reverse_sql="UPDATE projects_project SET slug = '' WHERE 1=1;",
        ),
        # Now enforce uniqueness
        migrations.AlterField(
            model_name="project",
            name="slug",
            field=models.SlugField(blank=True, unique=True),
        ),
        # Create WorkExperience model
        migrations.CreateModel(
            name="WorkExperience",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(help_text="Your role/position title", max_length=200)),
                ("company", models.CharField(max_length=200)),
                ("subtitle", models.CharField(blank=True, help_text="Team, department, or short tagline", max_length=300)),
                ("duration", models.CharField(blank=True, help_text="e.g. May 2024 \u2013 Aug 2024", max_length=100)),
                ("overview", models.TextField(blank=True, help_text="Short description of the role (markdown supported)")),
                ("what_built", models.TextField(blank=True, help_text="What you built \u2014 one bullet per line (markdown supported)")),
                ("impact", models.TextField(blank=True, help_text="Outcomes and impact \u2014 one bullet per line (markdown supported)")),
                ("tech_stack", models.JSONField(blank=True, default=list, help_text='List of technologies, e.g. ["Python", "React"]')),
                ("slug", models.SlugField(blank=True, help_text="Used for the detail page URL (/p/internships/{slug}/)", unique=True)),
                ("order", models.PositiveIntegerField(default=0, help_text="Lower numbers appear first")),
                ("featured", models.BooleanField(default=True, help_text="Show in the featured list on the home/experience page")),
                ("image", models.ImageField(blank=True, help_text="Optional preview image", null=True, upload_to="experience_images/")),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Work Experience",
                "verbose_name_plural": "Work Experiences",
                "ordering": ["order", "-created_at"],
            },
        ),
    ]
