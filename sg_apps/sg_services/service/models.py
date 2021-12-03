from django.db import models

# Create your models here.


class DocType(models.Model):
    doc_name = models.CharField(max_length=200)
    added_on = models.DateTimeField('date published')
    activation_status = models.BooleanField(default  = True)    

class DocConversion(models.Model):
    doctype = models.ForeignKey(DocType, on_delete=models.CASCADE,related_name = "doc_type")
    doc_conversion_allowed = models.ManyToManyField(DocType)
    activation_status = models.BooleanField(default  = True)



