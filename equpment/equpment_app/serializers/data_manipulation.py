from datetime import datetime
from ..models import *
from ..serializers.serializer import *

class DataConstructor:
    def __init__(self):
        None
        
    def parse_order(self, order):
        order_seri = OrderSerializer(order)
        order_data = order_seri.data
        
        order_datetime = datetime.strptime(order_data['datetime'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%d-%m-%y %H:%M')
        order_data['datetime'] = order_datetime

        branch = Branch.objects.get(pk=order_data['branch'])
        branch_seri = BranchSerializer(branch)
        order_data['branch_name'] = branch_seri.data['name']

        area = Area.objects.get(pk=branch_seri.data['area'])
        area_seri = AreaSerializer(area)
        order_data['area_name'] = area_seri.data['name']

        user = User.objects.get(pk=order_data['user'])
        user_seri = UserSerializer(user)
        order_data['users_name'] = user_seri.data['name']

        order_details = OrderDetails.objects.filter(order=order.id)
        order_details_seri = OrderDetailSerializer(order_details, many=True)
        order_details_data = order_details_seri.data

        order_data['all_order_approved_to_ship'] = all(detail['approved_to_ship'] for detail in order_details_seri.data)
        order_data['all_order_sent_to_supplier'] = all(detail['sent_to_supplier'] for detail in order_details_seri.data)
        order_data['all_order_recived'] = all(detail['recived'] for detail in order_details_seri.data)
        
        for detail in order_details_data:
            equipment = Equpment.objects.get(pk=detail['item'])
            equipment_seri = EqupmentSerializer(equipment)
            detail['detail_name'] = equipment_seri.data['name']
            detail['detail_price'] = equipment_seri.data['price']
            detail['detail_unit_measure'] = equipment_seri.data['unit_measure']
            detail['detail_price_for_order'] = float(equipment_seri.data['price']) * float(detail['quantity'])
            
            supplier = Supplier.objects.get(pk=equipment_seri.data['supplier'])
            supplier_seri = SupplierSerializer(supplier)
            
            detail['detail_supplier'] = supplier_seri.data['name']
            detail['detail_supplier_id'] = supplier_seri.data['id']

        order_data['order_total'] = sum(detail['detail_price_for_order'] for detail in order_details_data)

        return {"order": order_data, "details": order_details_seri.data}
    
    
    def parce_user(self, user):
        seri = UserSerializer(user)
        data = seri.data
        
        branch = Branch.objects.get(pk=data['default_branch'])
        branch_seri = BranchSerializer(branch)
        data['branch_name'] = branch_seri.data['name']
        
        return (data)
    
    
    def parce_cats(self, cat):
        seri = EqupmentCategorySerializer(cat)
        data = seri.data
        
        count = Equpment.objects.filter(category=data['id'], active=True).count()
        data['objects_in_category'] = count
        
        return (data)
    
    
    def parce_item_of_equpment(self, item):
        seri = EqupmentSerializer(item)
        data = seri.data
        
        category = EqupmentCategory.objects.get(pk=data['category'])
        cat_seri = EqupmentCategorySerializer(category)
        data['cat_name'] = cat_seri.data['name']
        
        supplier = Supplier.objects.get(pk=data['supplier'])
        supplier_seri = SupplierSerializer(supplier)
        data['supplier_name'] = supplier_seri.data['name']
        
        return (data)
    
    
    def parce_supplier(self, supplier):
        seri = SupplierSerializer(supplier)
        data = seri.data
        
        count = Equpment.objects.filter(supplier=data['id'], active=True).count()
        data['items_supplied'] = count
        
        return (data)
    
    
    def parce_orders_for_suppliers(self, orders):
        order_seri = OrderSerializer(orders, many=True)
        orders_data = order_seri.data
        
        all_branches = set()
        all_suppliers = set()
        all_unshipped_details=[]
        for order_data in orders_data:
            order_datetime = datetime.strptime(order_data['datetime'], '%Y-%m-%dT%H:%M:%S.%fZ').strftime('%d-%m-%y %H:%M')
            order_data['datetime'] = order_datetime

            branch = Branch.objects.get(pk=order_data['branch'])
            all_branches.add(branch.id)
            branch_seri = BranchSerializer(branch)
            order_data['branch_name'] = branch_seri.data['name']
            order_data['branch_address'] = branch_seri.data['address']

            area = Area.objects.get(pk=branch_seri.data['area'])
            area_seri = AreaSerializer(area)
            order_data['area_name'] = area_seri.data['name']

            order_details = OrderDetails.objects.filter(order=order_data['id'])
            order_details_seri = OrderDetailSerializer(order_details, many=True)
            order_details_data = order_details_seri.data

            for detail in order_details_data:
                equipment = Equpment.objects.get(pk=detail['item'])
                equipment_seri = EqupmentSerializer(equipment)
                detail['datetime'] = order_data['datetime'] 
                detail['branch'] = order_data['branch']
                detail['branch_name'] = order_data['branch_name']
                detail['branch_address'] = order_data['branch_address'] 
                detail['area_name'] = order_data['area_name']
                detail['detail_name'] = f"{equipment_seri.data['name']}, {equipment_seri.data['unit_measure']}"
                detail['detail_price'] = equipment_seri.data['price']
                detail['detail_price_for_order'] = float(equipment_seri.data['price']) * float(detail['quantity'])
                
                supplier = Supplier.objects.get(pk=equipment_seri.data['supplier'])
                supplier_seri = SupplierSerializer(supplier)
                
                detail['detail_supplier'] = supplier_seri.data['name']
                detail['detail_supplier_id'] = supplier_seri.data['id']
                all_suppliers.add(supplier_seri.data['id'])
                
                all_unshipped_details.append(detail)

        unshipped_by_aupplier_and_branch=[]
        by_supplier_dict = {}
        for supplier in all_suppliers:
            by_branch_dict = {}
            for branch in all_branches:
                by_branch_dict[branch]= [detail for detail in all_unshipped_details if detail['branch'] == branch and detail['detail_supplier_id'] == supplier]
                
            by_supplier_dict[supplier] = by_branch_dict
        
        unshipped_by_aupplier_and_branch.append(by_supplier_dict)
        return unshipped_by_aupplier_and_branch
            
