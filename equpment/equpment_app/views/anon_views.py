from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from models import *
from serializer import *

class AnonViews():
    def __init__(self):
        pass

    @api_view(['GET'])
    def login(self,request):
        pass


    @api_view(['POST'])
    def sign_up(self,request):
        pass
    
    