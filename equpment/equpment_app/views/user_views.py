from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from anon_views import AnonViews

class UserViews(AnonViews):
    def __init__(self) -> None:
        super().__init__()
    
    @api_view(['GET'])
    def get_all_branches(self,request):
        pass
    
    @api_view(['GET'])
    def get_branch(self,request, branch_id):
        pass
    
    @api_view(['GET'])
    def get_equpment_categories(self,request):
        pass
    
    @api_view(['GET'])
    def get_equpment_by_category(self,request, cat_id):
        pass
    
    
    @api_view(['GET'])
    def view_order_by_id(self,request, order_id):
        pass
    
    
    @api_view(['GET'])
    def view_orders_by_branch(self,request, branch_id):
        pass
    
    
    @api_view(['POST'])
    def add_order(self,request):
        pass
    
    
    @api_view(['PUT'])
    def approve_delivery(self,request, order_detail_id):
        pass
    
    
    @api_view(['DELETE'])
    def logout(self,request):
        pass
    
    
    @api_view(['PUT'])
    def update_profile(self,request):
        pass
    
    
    @api_view(['PUT'])
    def update_password(self,request):
        pass