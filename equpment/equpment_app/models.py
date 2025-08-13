from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.  
class Area(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name 
    
    
class Branch(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=1000,null=True)
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    next_order = models.DateField(null=True, blank=True)
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name  
   
 
class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_admin_user(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True, null=False)
    password = models.CharField(max_length=100)
    default_branch = models.ForeignKey('Branch', on_delete=models.CASCADE)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.name

    @property
    def is_admin(self):
        return self.is_admin
    
    
class EqupmentCategory(models.Model):
    name = models.CharField(max_length=200, unique=True)
    
    def __str__(self):
        return self.name   
    
    
class Supplier(models.Model):
    name = models.CharField(max_length=200, unique=True)
    contact_name = models.CharField(max_length=500,null=True)
    phone = models.CharField(max_length=100,null=True)
    email = models.CharField(max_length=500,null=True)
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name   
  
      
class Equpment(models.Model):
    name = models.CharField(max_length=500)
    unit_measure = models.CharField(max_length=50)
    category = models.ForeignKey(EqupmentCategory, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=50, decimal_places=2)
    requres_approval = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name   
    
    
class Order(models.Model):
    datetime = models.DateTimeField(auto_now_add=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.branch)
    
    
class OrderDetails(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Equpment, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    approved_to_ship = models.BooleanField(default=False)
    sent_to_supplier = models.BooleanField(default=False)
    recived = models.BooleanField(default=False)
    
    def __str__(self):
        return str(self.item)    