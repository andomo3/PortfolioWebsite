"""
python manage.py export_data

Exports all site data to a UTF-8 encoded JSON file.
Works on Windows where the default encoding is cp1252 and
emoji characters (e.g. in page content) cause dumpdata to fail.

Usage:
    python manage.py export_data               # writes to data.json
    python manage.py export_data --output=backup.json
"""

from io import StringIO

from django.core.management import call_command
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Export site data to a UTF-8 JSON fixture (Windows-safe dumpdata wrapper)."

    def add_arguments(self, parser):
        parser.add_argument(
            "--output",
            default="data.json",
            help="Output file path (default: data.json)",
        )

    def handle(self, *args, **options):
        output_path = options["output"]
        buf = StringIO()
        call_command(
            "dumpdata",
            "--natural-foreign",
            "--natural-primary",
            "--exclude=auth.permission",
            "--exclude=contenttypes",
            "--exclude=admin",
            "--indent=2",
            stdout=buf,
        )
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(buf.getvalue())
        self.stdout.write(self.style.SUCCESS(f"Data exported to {output_path}"))
