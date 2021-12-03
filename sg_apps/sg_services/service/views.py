from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django.template.loader import get_template 
from django.http import HttpResponse
from pdf2image import convert_from_path

@csrf_exempt
def get_conversion_type(request):
    resp_dict = {}
    if request.method == "POST":
        doc_type = request.POST['doc_type']
        if doc_type == "" or not DocType.objects.get(doc_name = doc_type):
            resp_dict['success'] = "False"
            resp_dict['message'] = "Invalid Doc type"
            return JsonResponse(resp_dict) 
        doc_type = DocType.objects.get(doc_name = doc_type)
        doc_conversion_type = DocConversion.objects.get(doctype = doc_type)
        doc_conversion_type = doc_conversion_type.doc_conversion_allowed.all()
        for doc_con_type in doc_conversion_type:
            doc_conversion_details['doc_name'] = doc_con_type.doc_name
            data.append(doc_conversion_details.copy())
        resp_dict['success'] = "True"
        resp_dict['data'] = data
        return JsonResponse(resp_dict)
        
    else:
        resp_dict['success'] = "False"
        resp_dict['message'] = "Invalid Request"
        return JsonResponse(resp_dict)
        #template = get_template('service/index.html')
        #context = {
        
        # }
    #return HttpResponse(template.render(context, request))


def convert_image_to_pdf(request):
    if request.method == "GET":
        template = get_template('service/index.html')
        context = {}
        return HttpResponse(template.render(context, request))
    else:
        authentication_key = request.POST['doc_type']
        doc = request.FILES['convert_doc']    
        doc_type = request.POST['doc_type']
        convert_to = request.POST['convert_to']
        if doc_type == "Image":
            default_directory=('/static/uploads/image/')
            if not os.path.exists(os.path.dirname(default_directory)):
               try:
                   os.makedirs(os.path.dirname(default_directory))
               except:
                   pass
            file_content = category_image.read()
            file_name = category_image.name
            file_name  = file_name.replace(' ','')
            full_path = default_directory + file_name
            f = open(full_path,"wb")
            f.write(file_content)
            f.close()
            image = Image.open(full_path)    
            pdf_bytes = img2pdf.convert(image.filename)
            pdf_path = full_path.replace(doc_type,'pdf')
            try:
                os.makedirs(os.path.dirname(pdf_path))
            except:
                pass 
            file = open(pdf_path, "wb")
            file.write(pdf_bytes)
            image.close()
            file.close()
            resp_dict['success'] = "True"
            resp_dict['file_path'] = pdf_path
            return JsonResponse(resp_dict)


def convert_pdf_to_image(request):
    if request.method == "GET":
        template = get_template('service/index.html')
        context = {}
        return HttpResponse(template.render(context, request))
    else:
        authentication_key = request.POST['doc_type']
        doc = request.FILES['convert_doc']
        doc_type = request.POST['doc_type']
        convert_to = request.POST['convert_to']

        if doc_type =="pdf":
            default_directory=('/static/uploads/pdf/')
            if not os.path.exists(os.path.dirname(default_directory)):
               try:
                   os.makedirs(os.path.dirname(default_directory))
               except:
                   pass
            file_content = category_image.read()
            file_name = category_image.name
            file_name  = file_name.replace(' ','')
            full_path = default_directory + file_name
            f = open(full_path,"wb")
            f.write(file_content)
            f.close()          
            img_path = full_path.replace(doc_type,'jpg')
            images = convert_from_path(full_path)
            for i in range(len(images)):
                images[i].save('page'+ str(i) +'.jpg', 'JPEG')
            resp_dict['success'] = "True"
            resp_dict['image_path'] = img_path
            return JsonResponse(resp_dict)



def convert_pdf2docx(input_file: str, output_file: str, pages: Tuple = None):
    if pages:
        pages = [int(i) for i in list(pages) if i.isnumeric()]
    result = parse(pdf_file=input_file,docx_with_path=output_file, pages=pages)
    summary = {
        "File": input_file, "Pages": str(pages), "Output File": output_file}
    print("\n".join("{}:{}".format(i, j) for i, j in summary.items()))
    return result       


def convert_pdf_to_docx(request):
    resp_dict = {}
    if request.method == "GET":
        template = get_template('service/index.html')
        context = {}
        return HttpResponse(template.render(context, request))
    else:
        authentication_key = request.POST['doc_type']
        doc = request.FILES['convert_doc']
        doc_type = request.POST['doc_type']
        convert_to = request.POST['convert_to']

        if doc_type =="pdf":
            default_directory=('/static/uploads/pdf/')
            if not os.path.exists(os.path.dirname(default_directory)):
               try:
                   os.makedirs(os.path.dirname(default_directory))
               except:
                   pass
            file_content = doc.read()
            file_name = doc.name
            file_name  = file_name.replace(' ','')
            full_path = default_directory + file_name
            f = open(full_path,"wb")
            f.write(file_content)
            f.close()
            doc_path = full_path.replace(".pdf",".docx")
            convert_pdf2docx(full_path,doc_path)            
            resp_dict['success'] = "True"
            resp_dict['doc_path'] = doc_path
            return JsonResponse(resp_dict) 

            
