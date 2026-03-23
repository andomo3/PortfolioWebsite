from django.contrib import admin
from django.utils.html import format_html
from .models import Project, WorkExperience


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'featured', 'has_image', 'has_embed', 'created_at')
    list_editable = ('featured',)
    list_filter = ('featured',)
    search_fields = ('title',)
    readonly_fields = ('slug', 'image_preview', 'created_at')
    fieldsets = (
        ('Basics', {
            'fields': ('title', 'slug', 'featured'),
            'description': 'Slug is set automatically from the title on first save. Edit it here if you want a shorter URL.'
        }),
        ('Content', {
            'fields': ('summary', 'body'),
            'description': (
                '<b>Summary</b>: shown on the project card (plain text, keep it short).<br>'
                '<b>Body</b>: full detail page content — markdown supported '
                '(use **bold**, # headings, - bullet lists, ```code blocks```).'
            )
        }),
        ('Links', {
            'fields': ('tech_stack', 'project_url', 'github_url'),
        }),
        ('Media', {
            'fields': ('image', 'image_preview', 'embed_code'),
            'description': (
                'Upload an <b>Image</b> for a static preview, or paste an <b>Embed code</b> '
                '(YouTube, Figma, GitHub Gist, etc.) for an interactive embed on the detail page. '
                'If both are provided, the embed is shown on the detail page and the image on the card.'
            )
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )

    def has_image(self, obj):
        return bool(obj.image)
    has_image.boolean = True
    has_image.short_description = 'Image'

    def has_embed(self, obj):
        return bool(obj.embed_code)
    has_embed.boolean = True
    has_embed.short_description = 'Embed'

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height:120px;border-radius:6px;" />', obj.image.url)
        return "No image uploaded."
    image_preview.short_description = "Preview"


@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'duration', 'order', 'featured', 'image_preview')
    list_editable = ('order', 'featured')
    list_filter = ('featured', 'company')
    search_fields = ('title', 'company')
    readonly_fields = ('slug', 'image_preview', 'created_at')
    fieldsets = (
        ('Basics', {
            'fields': ('title', 'company', 'subtitle', 'duration', 'slug', 'order', 'featured'),
        }),
        ('Content', {
            'fields': ('overview', 'what_built', 'impact'),
            'description': (
                '<b>Overview</b>: short paragraph about the role.<br>'
                '<b>What I Built</b>: one bullet per line — no dashes needed, just write the item.<br>'
                '<b>Impact</b>: one bullet per line.<br>'
                'All fields support **bold** markdown.'
            ),
        }),
        ('Tech Stack', {
            'fields': ('tech_stack',),
            'description': 'JSON list: ["Python", "React", "AWS"]',
        }),
        ('Media', {
            'fields': ('image', 'image_preview'),
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',),
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height:80px;border-radius:6px;" />', obj.image.url)
        return "—"
    image_preview.short_description = "Preview"
