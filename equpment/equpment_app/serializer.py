from rest_framework import serializers
from .models import *

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'name']
        
        
class BranchSerializer(serializers.ModelSerializer):
    area_id = serializers.PrimaryKeyRelatedField(queryset = Area.objects.all()) 
    
    class Meta:
        model = Branch
        fields = ['id', 'name', 'area_id', 'next_order']
        
        
class UserSerializer(serializers.ModelSerializer):
    deault_branch = serializers.PrimaryKeyRelatedField(queryset = Branch.objects.all())
    
    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'password', 'email', 'deault_branch', 'is_admin']
        
        
class TokenSerializer(serializers.ModelSerializer):
    user_id = serializers.PrimaryKeyRelatedField(queryset = User.objects.all())
    
    class Meta:
        model = Token
        fields = ['id', 'user_id','token', 'created', 'expires']
        

class EqupmentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EqupmentCategory
        fields = ['id', 'name']
        
        
class SupplierCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name','contact']
        
        
class EqupmentSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(EqupmentCategory = Branch.objects.all())
    supplier = serializers.PrimaryKeyRelatedField(Supplier = Branch.objects.all())
    
    class Meta:
        model = User
        fields = ['id', 'name', 'unit_measure', 'category', 'supplier', 'price', 'requres_approval']
        
        
class OrderSerializer(serializers.ModelSerializer):
    branch = serializers.PrimaryKeyRelatedField(Branch = Branch.objects.all())
    user = serializers.PrimaryKeyRelatedField(User = Branch.objects.all())
    
    class Meta:
        model = User
        fields = ['id', 'datetime', 'branch', 'user', 'sent_to_supplier']
        
        
class OrderDetailSerializer(serializers.ModelSerializer):
    order_id = serializers.PrimaryKeyRelatedField(Order = Branch.objects.all())
    item = serializers.PrimaryKeyRelatedField(Equpment = Branch.objects.all())
    
    class Meta:
        model = User
        fields = ['id', 'order_id', 'item', 'quantity', 'approved_to_ship', 'recived']