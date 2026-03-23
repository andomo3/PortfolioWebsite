from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("projects", "0006_project_slug_workexperience"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="slug",
            field=models.SlugField(max_length=200, unique=True, blank=True),
        ),
        migrations.AlterField(
            model_name="workexperience",
            name="slug",
            field=models.SlugField(
                max_length=200,
                unique=True,
                blank=True,
                help_text="Used for the detail page URL (/p/internships/{slug}/)",
            ),
        ),
    ]
