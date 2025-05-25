from django.shortcuts import render
from django.core.mail import send_mail
from .forms import ContactForm

def contact_view(request):
    form = ContactForm()
    success = False

    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Replace below with real email config or just log
            send_mail(
                subject=f"Portfolio Contact from {form.cleaned_data['name']}",
                message=form.cleaned_data['message'],
                from_email=form.cleaned_data['email'],
                recipient_list=['your.email@example.com'],
            )
            success = True

    return render(request, 'contact/contact.html', {'form': form, 'success': success})
