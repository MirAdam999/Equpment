from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .user_views import UserViews
from ..models import *
from ..serializer import *

class AdminViews(UserViews):
    def __init__(self) -> None:
        super().__init__()
           
    def get_orders_by_area(self,request):
        pass
    
    
    def get_all_orders(self,request):
        pass
    
    
    def get_orders_by_dates(self,request):
        pass
    
    
    def add_category(self,request):
        pass
    
    
    def update_category(self,request):
        pass
    
    
    def delete_category(self,request):
        pass
    
    
    def add_item(self,request):
        pass
    
    
    def update_item(self,request):
        pass
    
    
    def delete_item(self,request):
        pass   
    
    
    @api_view(['POST'])
    def add_branch(request):
        serializer = BranchSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    
    
    def update_branch(self,request):
        pass
    
    
    def delete_branch(self,request):
        pass  
    
    @api_view(['POST'])
    def add_area(request):
        serializer = AreaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    def update_area(self,request):
        pass
    
    
    def delete_area(self,request):
        pass  
    
    
    def add_supplier(self,request):
        pass
    
    
    def update_supplier(self,request):
        pass
    
    
    def delete_supplier(self,request):
        pass 


    def approve_order_detail(self,request):
        pass 
    
    
    def send_order_to_supplier(self,request):
        pass 