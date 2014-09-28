
import os, sys, traceback, json

from django.shortcuts import render, render_to_response, RequestContext
from django.http import HttpResponseRedirect, HttpResponse
    

from django.core.urlresolvers import reverse

from js_django import settings

from django.middleware import csrf
from django.views.decorators.csrf import csrf_protect


def get_or_create_csrf_token(request):
    token = request.META.get('CSRF_COOKIE', None)
    if token is None:
        token = csrf._get_new_csrf_key()
        request.META['CSRF_COOKIE'] = token
    request.META['CSRF_COOKIE_USED'] = True
    return token


def home(request):

    try:
    
        print('settings.TEMPLATE_DIRS: ', settings.TEMPLATE_DIRS)
        
        path1 = os.path.join(settings.BASE_DIR, "sequencer/templates/sequencer") + '/home.html'
        print('path: ', path1)
        
        html = open(path1).read()
        
        from django.core.context_processors import csrf
        
        print("csrf(request): ", csrf(request))
        
        response = HttpResponse(html)
        
#         response.set_cookie('stam_cookie', 'nechratz', expires=2) #, domain=settings.SESSION_COOKIE_DOMAIN, secure=settings.SESSION_COOKIE_SECURE or None)
        
        csrf_cookie = get_or_create_csrf_token(request)
        
        print("csrf_cookie: ", csrf_cookie)
        
        
    except Exception:
        print('exception: ', sys.exc_info)
        traceback.print_exc()
    
    return response


def raw_seq_data(request):
    
    """
    """   
    print('raw_seq_data')
    try:
     
        if request.is_ajax():
            if request.method == 'POST':
            
                j = json.loads(request.body.decode("utf-8"))
            
                print('raw_seq_data request json: ', j)
        
        path = '/cs/nextseq'
                
        if os.path.exists(path):
            
            dirs = os.listdir(path=path)
            
            raw_processed_map = {}
             
            for dir1 in dirs:
                 
                if not dir1.startswith('.'):
                    
                    dir_path = os.path.join(path, dir1)
                    
                    if os.path.isdir(dir_path):
                        print(dir_path)
                        raw_processed_map[dir1] = ['processed1', "processed2"]
                        
        else:
            print('path: ', path, ' does not exist')
            
            
                
    except Exception:
        print('exception: ', sys.exc_info)
        traceback.print_exc()
        
    
    try:
        
        raw_map = json.dumps(raw_processed_map)
#             print('json version:', j)
    except Exception:
        print(sys.exc_info())
        
#     print('plate_map: ', plate_map) 
#     snapshot_model_map = util.getSnaphotModelMap(personal_name, is_liquid)
    
    return HttpResponse(raw_map)    



@csrf_protect    
def bcl2fastq(request):
    
    print('bcl2fastq')
    
    if request.method == 'POST':
        
        print('Method is Post')
        print('')
        
#         for t in request.POST.items():  #this was the probelmatic code
#             print('tuple: ', str(t))
        
        try:
        
#             p = request.FILESPOST
#         
#         
#             personal_name = p.__getitem__('personal_name')
#             print('personal_name: ', personal_name)            
             
    #         print('request.FILES: ', request.FILES)
    #         print('')
            
            for key in request.FILES.keys():
                print('key: ' + key)
                
            data = request.FILES['input_file']
            
    #         print(data.name)
    #         print('data type:', type(data))
            
    #         print('data.read() type: ', type(data.read()))
            
            if data.name[-3:]=='csv':
                
                r = {"message":'succesfuly received csv: ' + data.name, 'followup_id': 3}
            else:
                r = {"message":'File should be in csv format: ' + data.name, 'followup_id': 'none'}
            
        except Exception:
            print('exception: ', sys.exc_info)
            traceback.print_exc()
            
            r = {"message":'Failed to received csv insted received: ' + data.name, 'followup_id': 'none'}    
        
    else:
        r = {"message":'Method is not Post', 'followup_id': 'none'} 


    return HttpResponse(json.dumps(r))


def bcl2fastq_followup(request):
    
    """
    """   
    print('bcl2fastq_followup')
    try:
     
        if request.is_ajax():
            if request.method == 'POST':
            
                j = json.loads(request.body.decode("utf-8"))
            
                print('j: ', j)            

        
        j['message'] = 'followup'
        print("j['counter']:", j['counter'])
        
    except Exception:
        print(sys.exc_info())
        
    print("type(j): ", type(j))
    
    return HttpResponse(json.dumps(j))    