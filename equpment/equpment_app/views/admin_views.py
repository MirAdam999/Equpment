from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from user_views import UserViews

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
    
    
    def add_branch(self,request):
        pass
    
    
    def update_branch(self,request):
        pass
    
    
    def delete_branch(self,request):
        pass  
    
    
    def add_area(self,request):
        pass
    
    
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