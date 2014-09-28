from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

# print('settings.MEDIA_ROOT: ', settings.MEDIA_ROOT)

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'js_django.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'js_django.views.home', name='home'),
#     url(r'^js_django/', include('js_django.urls', namespace='js_django')),
    url(r'^sequencer/', include('sequencer.urls', namespace='sequencer')),
    
) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



# print('urlpatterns: ', urlpatterns)