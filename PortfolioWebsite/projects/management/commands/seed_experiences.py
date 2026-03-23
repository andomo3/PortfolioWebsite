"""
python manage.py seed_experiences

Does two things:
  1. Creates the 4 WorkExperience records in the database (skips any that already exist).
  2. Finds every published PageVersion whose layout_json contains an internshipList
     or internshipTimeline block and switches it to source="db" so it reads from
     the database instead of hardcoded JSON.
"""

import json
from django.core.management.base import BaseCommand
from django.utils.text import slugify
from projects.models import WorkExperience
from builder.models import PageVersion


EXPERIENCES = [
    {
        "title": "Software Engineering Intern",
        "company": "KPMG",
        "subtitle": "Built backend services to improve enterprise document retrieval.",
        "duration": "Jun 2024 - Aug 2024",
        "overview": (
            "Supported a document intelligence platform by shipping Python services "
            "and internal tooling. Focused on improving accuracy, reliability, and "
            "response times for internal users."
        ),
        "what_built": (
            "Built Python microservices for document ingestion and retrieval.\n"
            "Improved ingestion monitoring with structured logging and alerts.\n"
            "Partnered with QA to validate accuracy improvements."
        ),
        "impact": (
            "Raised retrieval accuracy to 95%+ across 1,000+ files.\n"
            "Reduced manual review time by 40% for internal teams."
        ),
        "tech_stack": ["Python", "CI/CD", "Microservices"],
        "order": 0,
        "featured": True,
    },
    {
        "title": "Quantitative Analyst Mentee",
        "company": "Georgia Tech",
        "subtitle": "Built an automated equity screener and backtesting workflow.",
        "duration": "Jan 2025 - May 2025",
        "overview": (
            "Worked with mentors to research factors and build a reusable equity "
            "screening pipeline for student-managed portfolios."
        ),
        "what_built": (
            "Automated equity screening in Python with pandas and yfinance.\n"
            "Created reusable factor backtests with clear reporting.\n"
            "Documented workflows for future cohorts."
        ),
        "impact": (
            "Delivered a screening tool adopted by the student fund.\n"
            "Enabled faster weekly factor reviews for the team."
        ),
        "tech_stack": ["Python", "pandas", "yfinance", "Jupyter"],
        "order": 1,
        "featured": True,
    },
    {
        "title": "DEI Committee Chair",
        "company": "Georgia Tech",
        "subtitle": "Led programming and coordination for student DEI initiatives.",
        "duration": "Jan 2025 - Present",
        "overview": (
            "Led event programming and cross-team coordination to improve student "
            "engagement and access to resources across the ISyE community."
        ),
        "what_built": (
            "Designed event architecture and speaker series programming.\n"
            "Coordinated cross-functional volunteers and logistics.\n"
            "Built feedback loops to improve event attendance."
        ),
        "impact": (
            "Increased event participation and retention semester-over-semester.\n"
            "Improved clarity of resource sharing across cohorts."
        ),
        "tech_stack": [],
        "order": 2,
        "featured": False,
    },
    {
        "title": "Housing Office Assistant",
        "company": "Georgia Tech",
        "subtitle": "Supported residents and streamlined housing operations.",
        "duration": "Aug 2024 - Present",
        "overview": (
            "Supported daily operations, resident communications, and event "
            "logistics for housing services."
        ),
        "what_built": (
            "Built resident support workflows and FAQs for faster issue resolution.\n"
            "Managed inventory and event logistics for community programming."
        ),
        "impact": (
            "Reduced response time for resident inquiries.\n"
            "Improved consistency of housing communications."
        ),
        "tech_stack": [],
        "order": 3,
        "featured": False,
    },
]


class Command(BaseCommand):
    help = "Seed WorkExperience records and switch page blocks to source=db"

    def handle(self, *args, **options):
        # ── 1. Seed WorkExperience records ──────────────────────────────────
        self.stdout.write("Seeding work experiences...")
        for data in EXPERIENCES:
            slug = slugify(f"{data['company']}-{data['title']}")
            exp, created = WorkExperience.objects.get_or_create(
                slug=slug,
                defaults={
                    "title": data["title"],
                    "company": data["company"],
                    "subtitle": data["subtitle"],
                    "duration": data["duration"],
                    "overview": data["overview"],
                    "what_built": data["what_built"],
                    "impact": data["impact"],
                    "tech_stack": data["tech_stack"],
                    "order": data["order"],
                    "featured": data["featured"],
                },
            )
            status = "created" if created else "already exists"
            self.stdout.write(f"  [{status}] {exp.company} — {exp.title}")

        # ── 2. Switch page blocks to source="db" ────────────────────────────
        self.stdout.write("\nUpdating page blocks to source=db...")
        block_types = {"internshipList", "internshipTimeline"}
        updated_pages = 0

        for version in PageVersion.objects.all():
            layout = version.layout_json or {}
            blocks = layout.get("blocks", [])
            changed = False

            for block in blocks:
                if block.get("type") in block_types:
                    props = block.setdefault("props", {})
                    if props.get("source") != "db":
                        props["source"] = "db"
                        # Remove stale hardcoded items so they don't linger
                        props.pop("items", None)
                        changed = True

            if changed:
                version.layout_json = layout
                version.save(update_fields=["layout_json"])
                updated_pages += 1
                self.stdout.write(
                    f"  Updated: {version.page.slug} (version {version.version_number})"
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"\nDone. {len(EXPERIENCES)} experiences seeded, "
                f"{updated_pages} page version(s) updated to source=db."
            )
        )
