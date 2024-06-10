from rest_framework import serializers
from django.contrib.auth import get_user_model
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
    default_branch = serializers.PrimaryKeyRelatedField(queryset = Branch.objects.all()) 

    class Meta:
        model = User
        fields = ['id', 'name', 'username', 'email', 'default_branch', 'is_admin', 'is_active']

# signup and login seri        
User = get_user_model()

class UserSignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

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


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
        

class EqupmentCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = EqupmentCategory
        fields = ['id', 'name']
        
        
class SupplierCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name','contact']
        
        
class EqupmentSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset = EqupmentCategory.objects.all())
    supplier = serializers.PrimaryKeyRelatedField(queryset = Supplier.objects.all())
    
    class Meta:
        model = Equpment
        fields = ['id', 'name', 'unit_measure', 'category', 'supplier', 'price', 'requres_approval']
        
        
class OrderSerializer(serializers.ModelSerializer):
    branch = serializers.PrimaryKeyRelatedField(queryset = Branch.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset = User.objects.all())
    
    class Meta:
        model = Order
        fields = ['id', 'datetime', 'branch', 'user', 'sent_to_supplier']
        
        
class OrderDetailSerializer(serializers.ModelSerializer):
    order_id = serializers.PrimaryKeyRelatedField(queryset = Order.objects.all())
    item = serializers.PrimaryKeyRelatedField(queryset = Equpment.objects.all())
    
    class Meta:
        model = Order_Details
        fields = ['id', 'order_id', 'item', 'quantity', 'approved_to_ship', 'recived']