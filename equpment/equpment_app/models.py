from django.db import models

# Create your models here.  
class Area(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self):
        return self.name 
    
    
class Branch(models.Model):
    name = models.CharField(max_length=50)
    area_id = models.ForeignKey(Area, on_delete=models.CASCADE)
    next_order = models.DateField()
    
    def __str__(self):
        return self.name  
    

class User(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=False)
    deault_branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    is_admin = models.BinaryField()
    
    def __str__(self):
        return self.name   
    
    
class Token(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    token = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)
    expires = models.DateTimeField()
    
    def __str__(self):
        return self.name  
    
    
class EqupmentCategory(models.Model):
    name = models.CharField(max_length=200, unique=True)
    
    def __str__(self):
        return self.name   
    
    
class Supplier(models.Model):
    name = models.CharField(max_length=200, unique=True)
    contact = models.CharField(max_length=500)
    
    def __str__(self):
        return self.name   
  
      
class Equpment(models.Model):
    name = models.CharField(max_length=500)
    unit_measure = models.CharField(max_length=50)
    category = models.ForeignKey(EqupmentCategory, on_delete=models.CASCADE)
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=50, decimal_places=2)
    requres_approval = models.BinaryField(default=False)
    
    def __str__(self):
        return self.name   
    
    
class Order(models.Model):
    datetime = models.DateTimeField(auto_now_add=True)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    sent_to_supplier = models.BinaryField(default=False)
    
    def __str__(self):
        return self.name  
    
    
class Order_Details(models.Model):
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)
    item = models.ForeignKey(Equpment, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    approved_to_ship = models.BinaryField(default=False)
    recived = models.BinaryField(default=False)
    
    def __str__(self):
        return self.name    