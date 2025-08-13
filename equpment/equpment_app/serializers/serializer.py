from rest_framework import serializers
from django.contrib.auth import get_user_model
from ..models import *

class AreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Area
        fields = ['id', 'name']
        
        
class BranchSerializer(serializers.ModelSerializer):
    area = serializers.PrimaryKeyRelatedField(queryset = Area.objects.all()) 
    
    class Meta:
        model = Branch
        fields = ['id', 'name','address', 'area', 'next_order','active']              
        

class UserSerializer(serializers.ModelSerializer):
    default_branch = serializers.PrimaryKeyRelatedField(queryset = Branch.objects.all()) 

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'default_branch', 'is_superuser', 'is_active']

# add user seri        
User = get_user_model()

class AddUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    default_branch = serializers.PrimaryKeyRelatedField(queryset = Branch.objects.all()) 

    class Meta:
        model = User
        fields = ['username', 'email', 'name', 'password', 'default_branch']
        
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data['name'],
            default_branch=validated_data['default_branch'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
         

class EqupmentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EqupmentCategory
        fields = ['id', 'name']
        
        
class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id','name','contact_name','phone','email','active']
        
        
class EqupmentSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset = EqupmentCategory.objects.all())
    supplier = serializers.PrimaryKeyRelatedField(queryset = Supplier.objects.all())
    
    class Meta:
        model = Equpment
        fields = ['id', 'name', 'unit_measure', 'category', 'supplier', 'price', 'requres_approval','active']
        
        
class OrderSerializer(serializers.ModelSerializer):
    branch = serializers.PrimaryKeyRelatedField(queryset = Branch.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset = User.objects.all())
    
    class Meta:
        model = Order
        fields = ['id', 'datetime', 'branch', 'user']
        
        
class OrderDetailSerializer(serializers.ModelSerializer):
    order = serializers.PrimaryKeyRelatedField(queryset = Order.objects.all())
    item = serializers.PrimaryKeyRelatedField(queryset = Equpment.objects.all())
    
    class Meta:
        model = OrderDetails
        fields = ['id', 'order', 'item', 'quantity', 'approved_to_ship', 'sent_to_supplier','recived']