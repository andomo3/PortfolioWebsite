from django import template
import re
from django.utils.safestring import mark_safe

register = template.Library()


@register.filter
def dict_get(value, key):
    if isinstance(value, dict) and key in value:
        return value.get(key)
    return None


@register.filter
def split_commas(value):
    if not value:
        return []
    return [item.strip() for item in str(value).split(",") if item.strip()]


@register.filter
def split_lines(value):
    if not value:
        return []
    return [line.strip() for line in str(value).splitlines() if line.strip()]


@register.filter
def as_list(value):
    if isinstance(value, (list, tuple)):
        return value
    if not value:
        return []
    return split_lines(value)


@register.filter(is_safe=True)
def markdown_bold(value):
    if not value:
        return ""
    text = str(value)
    return mark_safe(re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text))
