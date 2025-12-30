import uuid

from django.core.management.base import BaseCommand

from builder.models import Page, PageVersion


def make_block(block_type, props):
    return {"id": uuid.uuid4().hex, "type": block_type, "props": props}


class Command(BaseCommand):
    help = "Seed builder pages with starter layouts copied from legacy templates."

    def add_arguments(self, parser):
        parser.add_argument(
            "--force",
            action="store_true",
            help="Create a new published version even if one already exists.",
        )

    def handle(self, *args, **options):
        force = options["force"]

        pages = {
            "home": self.home_layout(),
            "projects": self.projects_layout(),
            "resume": self.resume_layout(),
            "contact": self.contact_layout(),
        }

        for slug, layout in pages.items():
            page, _ = Page.objects.get_or_create(slug=slug, defaults={"title": slug.title()})
            if page.versions.exists() and not force:
                self.stdout.write(self.style.WARNING(f"Skipping {slug}: already has versions."))
                continue

            latest = page.versions.order_by("-version_number").first()
            next_version = 1 if not latest else latest.version_number + 1
            PageVersion.objects.filter(page=page, is_published=True).update(
                is_published=False
            )
            PageVersion.objects.create(
                page=page,
                version_number=next_version,
                layout_json=layout,
                is_published=True,
                created_by=None,
            )
            self.stdout.write(self.style.SUCCESS(f"Published {slug} v{next_version}."))

    def home_layout(self):
        about_body = (
            "I've lived across six countries and can read or write in 5 languages. "
            "I want to blend engineering rigor, quantitative thinking, probabilistic analysis "
            "to create thoughtful experiences and have sustainable impact.\n\n"
            "From benchmarking LLMs in fintech to being mentored by a $2M+ student fund, "
            "I thrive where math, code, and design meet.\n\n"
            "At Georgia Tech, I've built a reputation for being kind, dependable, and curious "
            "by serving as a member of the DEI Committee at the H. Milton Stewart School of Industrial "
            "and Systems Engineering and as a Housing Office Assistant. Through both roles, "
            "I supported hundreds of students by providing resources, hosting events, and "
            "orchestrating discussions with senior faculty members.\n\n"
            "My north star: build useful, resilient tools; communicate clearly; and leave teams better than I found them."
        )

        experience_body = (
            "Full Stack Project — Boxxer AI (Jan 2025 - Present)\n"
            "Built a travel assistant app to optimize item recommendations within weight limits.\n\n"
            "Quantitative Analyst Mentee — Georgia Tech (Jan 2025 - May 2025)\n"
            "Developed an automated equity screener in Python using pandas and yfinance.\n\n"
            "Software Engineering Intern — KPMG (Jun 2024 - Aug 2024)\n"
            "Increased document retrieval accuracy to 95%+ across 1,000+ files using Python microservices.\n\n"
            "DEI Committee — Georgia Tech (Jan 2025 - Present)\n"
            "Streamlined DEI event architecture and speaker series management."
        )

        highlights_body = (
            "Full-Stack & Systems: Shipping Django/FastAPI services with CI/CD and clean interfaces.\n"
            "Quant & Data: Backtesting, factor research, and analytics with Python, NumPy, SciPy, and Bloomberg.\n"
            "Product & People: Facilitating teams and translating ambiguity into shippable plans."
        )

        awards_body = (
            "ISyE x CASE Peer Inspiration Award (2025): Exceptional commitment and growth during MentIE.\n"
            "Dean's List @ Georgia Tech: Recognized for maintaining a high GPA."
        )

        courses_body = (
            "CS 4641: Machine Learning\n"
            "CS 4400: Introduction to Databases\n"
            "MATH 1564: Honors Linear Algebra\n"
            "ISYE 2027: Probability & its Applications\n"
            "ISYE 3030: Basic Statistical Methods\n"
            "CS 1331: Introduction to Object Oriented Programming\n"
            "MATH 2106: Foundations of Mathematical Proof\n"
            "CS 1332: Data Structures & Algorithms\n"
            "GTSF Quant Sector: Statistical Inference for Quantitative Finance"
        )

        return {
            "blocks": [
                make_block(
                    "hero",
                    {
                        "kicker": "Builder | Quant-Oriented Data Analyst",
                        "title": "Hi, I'm Abba (ah-buh).",
                        "subtitle": "I am dependable and empathetic, with a strong passion for community and collaboration.",
                        "pills": [
                            "Actively seeking Summer 2025 Data Analyst",
                            "Building: Boxxer AI",
                            "Learning: Support Vector Machine, Deep Learning and Neural networks",
                        ],
                        "ctaPrimary": {"label": "View Projects", "href": "/p/projects/"},
                        "ctaSecondary": {"label": "Download Resume", "href": "/p/resume/"},
                        "mediaType": "image",
                        "mediaUrl": "",
                        "mediaAlt": "Hero media",
                        "mediaLink": "",
                        "mediaAssetId": None,
                    },
                ),
                make_block("richText", {"heading": "About", "body": about_body}),
                make_block("richText", {"heading": "Experience & Internships", "body": experience_body}),
                make_block("projectGrid", {"heading": "Featured Projects", "source": "featured", "columns": 3}),
                make_block("richText", {"heading": "Highlights", "body": highlights_body}),
                make_block("richText", {"heading": "Awards & Achievements", "body": awards_body}),
                make_block("richText", {"heading": "Courses & Certifications", "body": courses_body}),
            ]
        }

    def projects_layout(self):
        return {
            "blocks": [
                make_block("richText", {"heading": "Projects", "body": "A selection of recent work."}),
                make_block("projectGrid", {"heading": "Projects", "source": "all", "columns": 3}),
            ]
        }

    def research_layout(self):
        return {
            "blocks": [
                make_block(
                    "researchList",
                    {
                        "heading": "Research",
                        "description": "Recent research notes and explorations.",
                        "embedUrl": "",
                        "embedHeight": 720,
                    },
                ),
            ]
        }

    def testimonials_layout(self):
        return {
            "blocks": [
                make_block("richText", {"heading": "Testimonials", "body": "Feedback from collaborators and mentors."}),
                make_block("testimonialsGrid", {"heading": "Testimonials"}),
            ]
        }

    def resume_layout(self):
        return {
            "blocks": [
                make_block("resumeEmbed", {"heading": "Resume", "resumeUrl": "/media/resume/Abba_Resume.pdf"}),
            ]
        }

    def contact_layout(self):
        body = (
            "Email: abba.ndomo@gmail.com\n"
            "Phone: +1 (404) 819-5945\n"
            "LinkedIn: https://linkedin.com/in/AbbaNdomo\n"
            "GitHub: https://github.com/andomo3"
        )
        return {
            "blocks": [
                make_block("richText", {"heading": "Get in Touch", "body": body}),
            ]
        }
