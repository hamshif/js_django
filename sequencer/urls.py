
# -*- coding: utf-8 -*-
from django.conf.urls import patterns, url

urlpatterns = patterns('sequencer.views',
    url(r'^home/$', 'home', name='home'),
    url(r'^raw_seq_data/$', 'raw_seq_data', name='raw_seq_data'),
    url(r'^bcl2fastq/$', 'bcl2fastq', name='bcl2fastq'),
    url(r'^bcl2fastq_followup/$', 'bcl2fastq_followup', name='bcl2fastq_followup'),
    
)