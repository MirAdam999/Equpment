
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .anon_views import AnonViews
from rest_framework.permissions import IsAuthenticated
from ..models import *
from ..serializer import *

class UserViews(AnonViews):
    def __init__(self) -> None:
        super().__init__()
    
    @api_view(['GET'])
    def get_all_branches(request):
        branches = Branch.objects.all()
        seri = BranchSerializer(branches, many=True)
        return Response(seri.data)
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
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
    
    
    @api_view(['PUT'])
    def update_profile(self,request):
        pass
    
    
    @api_view(['PUT'])
    def update_password(self,request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not old_password or not new_password:
            return Response({'err': 'Both old and new passwords are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        if not user.check_password(old_password):
            return Response({'wrong': 'Invalid old password'}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(new_password)
        user.save()
        
        return Response({'detail': 'Password updated successfully'}, status=status.HTTP_200_OK)
