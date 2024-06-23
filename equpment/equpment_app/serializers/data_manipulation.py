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

        order_data['order_total'] = sum(detail['detail_price_for_order'] for detail in order_details_data)

        return {"order": order_data, "details": order_details_seri.data}