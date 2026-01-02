from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("builder", "0001_initial"),
        ("projects", "0004_project_embed_code"),
    ]

    operations = [
        migrations.AddField(
            model_name="project",
            name="preview_media_asset",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="project_previews",
                to="builder.mediaasset",
            ),
        ),
    ]
