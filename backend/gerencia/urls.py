from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # suas urls
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)