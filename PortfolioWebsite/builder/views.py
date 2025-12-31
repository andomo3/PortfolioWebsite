from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import get_object_or_404, render
from django.utils.text import slugify

from .models import Page, MediaAsset, PageVersion
from projects.models import Project


@staff_member_required
def studio_page(request, slug):
    Page.objects.get_or_create(slug=slug, defaults={"title": slug.title()})
    return render(request, "builder/studio.html", {"page_slug": slug})


def public_page(request, slug):
    page, _ = Page.objects.get_or_create(slug=slug, defaults={"title": slug.title()})
    pv = page.versions.filter(is_published=True).order_by("-created_at").first()
    layout = pv.layout_json if pv else {"blocks": []}
    featured_projects = Project.objects.filter(featured=True).order_by("-created_at")[:6]
    all_projects = Project.objects.all().order_by("-created_at")[:12]
    project_list = list(all_projects)
    for project in featured_projects:
        if project.id not in {item.id for item in project_list}:
            project_list.append(project)

    project_slugs = {project.id: slugify(project.title) for project in project_list}
    project_page_slugs = [f"project-{slug}" for slug in project_slugs.values()]
    project_pages = Page.objects.filter(slug__in=project_page_slugs)
    project_page_map = {page.slug: page for page in project_pages}
    published_versions = PageVersion.objects.filter(
        page__in=project_pages, is_published=True
    ).order_by("-created_at")
    published_map = {}
    for version in published_versions:
        if version.page_id not in published_map:
            published_map[version.page_id] = version

    project_previews = {}
    media_ids = []

    def extract_preview(layout_data):
        title = None
        body = None
        media = {}
        for block in layout_data.get("blocks", []):
            block_type = block.get("type")
            props = block.get("props", {})
            if block_type == "projectTitle" and not title:
                title = props.get("title")
            elif block_type == "projectBody" and not body:
                body = props.get("body")
            elif block_type == "projectMedia" and not media:
                media = {
                    "media_type": props.get("mediaType", "image"),
                    "media_url": props.get("mediaUrl"),
                    "media_alt": props.get("mediaAlt"),
                    "media_asset_id": props.get("mediaAssetId"),
                    "embed_url": props.get("embedUrl"),
                    "embed_height": props.get("embedHeight"),
                }
        return {"title": title, "body": body, **media}

    for project in project_list:
        project_slug = project_slugs[project.id]
        page_slug = f"project-{project_slug}"
        page = project_page_map.get(page_slug)
        version = published_map.get(page.id) if page else None
        if version:
            preview = extract_preview(version.layout_json or {})
        else:
            preview = {
                "title": None,
                "body": None,
                "media_type": None,
                "media_url": None,
                "media_alt": None,
                "media_asset_id": None,
                "embed_url": None,
                "embed_height": None,
            }
        project_previews[project.id] = preview
        media_id = preview.get("media_asset_id")
        if media_id:
            media_ids.append(media_id)

    for block in layout.get("blocks", []):
        media_id = block.get("props", {}).get("mediaAssetId")
        if media_id:
            media_ids.append(media_id)

    media_assets = MediaAsset.objects.filter(id__in=media_ids)
    media_asset_map = {asset.id: asset for asset in media_assets}
    context = {
        "layout": layout,
        "page": page,
        "version": pv,
        "featured_projects": featured_projects,
        "all_projects": all_projects,
        "project_previews": project_previews,
        "resume_url": "/media/resume/Abba_Resume.pdf",
        "media_asset_map": media_asset_map,
    }
    return render(request, "builder/public_page.html", context)


def project_public_page(request, slug):
    project = None
    for candidate in Project.objects.all():
        if slugify(candidate.title) == slug:
            project = candidate
            break

    page_slug = f"project-{slug}"
    default_title = project.title if project else slug.replace("-", " ").title()
    page, _ = Page.objects.get_or_create(slug=page_slug, defaults={"title": default_title})
    pv = page.versions.filter(is_published=True).order_by("-created_at").first()
    layout = pv.layout_json if pv else {"blocks": []}
    media_ids = []
    for block in layout.get("blocks", []):
        media_id = block.get("props", {}).get("mediaAssetId")
        if media_id:
            media_ids.append(media_id)
    media_assets = MediaAsset.objects.filter(id__in=media_ids)
    media_asset_map = {asset.id: asset for asset in media_assets}
    context = {
        "layout": layout,
        "page": page,
        "version": pv,
        "media_asset_map": media_asset_map,
    }
    return render(request, "builder/public_page.html", context)


def internship_public_page(request, slug):
    page_slug = f"internship-{slug}"
    page, _ = Page.objects.get_or_create(
        slug=page_slug,
        defaults={"title": slug.replace("-", " ").title()},
    )
    pv = page.versions.filter(is_published=True).order_by("-created_at").first()
    layout = pv.layout_json if pv else {"blocks": []}
    media_ids = []
    for block in layout.get("blocks", []):
        media_id = block.get("props", {}).get("mediaAssetId")
        if media_id:
            media_ids.append(media_id)
    media_assets = MediaAsset.objects.filter(id__in=media_ids)
    media_asset_map = {asset.id: asset for asset in media_assets}
    context = {
        "layout": layout,
        "page": page,
        "version": pv,
        "media_asset_map": media_asset_map,
    }
    return render(request, "builder/public_page.html", context)

