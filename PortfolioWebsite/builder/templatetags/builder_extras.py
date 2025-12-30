from django import template

register = template.Library()


@register.filter
def dict_get(value, key):
    if isinstance(value, dict) and key in value:
        return value.get(key)
    return None
