from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.db import transaction
from .user_views import UserViews
from ..models import *
from ..serializers.serializer import *
from ..log.logger import Logger
from ..serializers.data_manipulation import DataConstructor
from ..serializers.email_handler import EmailHandler
from datetime import datetime
from django.http import HttpResponse
from django.http import FileResponse
from django.template.loader import render_to_string
from weasyprint import HTML
from io import BytesIO

logger = Logger()
data_constructor = DataConstructor()
email_handler = EmailHandler()

class AdminViews(UserViews):
    def __init__(self):
        super().__init__()
        
    @api_view(['POST'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def add_user(request):
        """
        12.06.24
        Args: POST, (body json data 'username', 'password', 'email', 'name', 'default_branch')
        Returns: new user + 201/ err + 400/500
        """
        try:
            serializer = AddUserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = {'new_user': serializer.data}
                return Response(output, status=status.HTTP_201_CREATED)
            
            else:
                output = serializer.errors
                if 'username' in output:
                    return Response({'wrong': 'משתמש עם שם משתמש זה כבר קיים, אנא בחר שם משתמש שונה'}, status=status.HTTP_400_BAD_REQUEST)
                
                if 'email' in output:
                    return Response({'wrong': 'משתמש עם דוא"ל זה כבר קיים'}, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({'err': output}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            output = str(e)
            return Response({'err': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','add_user', request.data, output)
            
            
    @api_view(['GET'])
    @permission_classes([IsAuthenticated,IsAdminUser])
    def get_user_by_id(request, user_id):
        try:
            user = User.objects.get(pk = user_id)
            seri = UserSerializer(user)
            output = {"user":seri.data}
            return Response(output, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            output = f"No user with id {user_id}."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_user_by_id',user_id,output)
            
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated,IsAdminUser])   
    def get_all_users(request):
        try:
            users = User.objects.all()
            seri = UserSerializer(users, many = True)
            output = seri.data
            return Response({"all_users":output}, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            output = f"No Users Found"
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_all_users',None,output)    
    
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def get_filtered_users(request):
        try:
            user_type = request.GET.get('user_type', 'all')
            user_status = request.GET.get('user_status', 'all')

            filters = {}

            if user_type != 'all':
                filters['is_superuser'] = user_type

            if user_status != 'all':
                filters['is_active'] = user_status

            users = User.objects.filter(**filters)

            filtered_users = []
            for user in users:
                parced_user = data_constructor.parce_user(user)
                filtered_users.append(parced_user)
                
            output = filtered_users
            return Response({"filtered_users": output}, status=status.HTTP_200_OK)
        
        except Exception as e:
            output = str(e)
            return Response({"error": output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

    @api_view(['PUT'])
    @permission_classes([IsAuthenticated,IsAdminUser]) 
    def disactivate_user(request, user_id):
        try:
            user = User.objects.get(pk = user_id)
            current_user = request.user
            if user:
                if user_id == current_user.id:
                    output = {"wrong":"Cannot disactivate oneself"}
                    return Response(output, status=status.HTTP_400_BAD_REQUEST)
                
                user.is_active = False
                user.save() 
                
                output = {"user_disactivated":user_id}
                return Response(output, status=status.HTTP_200_OK) 
        
        except User.DoesNotExist:
            output = f"No user with id {user_id}."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','disactivate_user',user_id,output)    
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated,IsAdminUser])  
    def activate_user(request, user_id):
        try:
            user = User.objects.get(pk = user_id)
            if user:
                user.is_active = True
                user.save() 
                
                output = {"user_activated":user_id}
                return Response(output, status=status.HTTP_200_OK) 
        
        except User.DoesNotExist:
            output = f"No user with id {user_id}."
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','activate_user',user_id,output)        
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated,IsAdminUser]) 
    def make_admin(request, user_id):
        try:
            user = User.objects.get(pk = user_id)
            if user:
                user.is_superuser = True
                user.save() 
                
                output = {"made_admin":user_id}
                return Response(output, status=status.HTTP_200_OK) 
        
        except User.DoesNotExist:
            output = f"No user with id {user_id}."
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','make_admin',user_id,output)    


    @api_view(['PUT'])
    @permission_classes([IsAuthenticated,IsAdminUser]) 
    def revoke_admin(request, user_id):
        try:
            user = User.objects.get(pk = user_id)
            current_user = request.user
            if user:
                if user_id == current_user.id:
                    output = {"wrong":"Cannot revoke own admin premmisions"}
                    return Response(output, status=status.HTTP_400_BAD_REQUEST)
                    
                user.is_superuser = False
                user.save() 
                
                output = {"revoked_admin":user_id}
                return Response(output, status=status.HTTP_200_OK) 
        
        except User.DoesNotExist:
            output = f"No user with id {user_id}."
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','revoke_admin',user_id,output)       
       
       
    @api_view(['GET'])
    @permission_classes([IsAuthenticated,IsAdminUser])    
    def get_orders_by_branch(request, branch_id):
        try:
            orders = Order.objects.filter(branch = branch_id)
            all_orders_data = []
            for order in orders:
                order_seri = OrderSerializer(order)
                order_details = OrderDetails.objects.filter(order = order.id)
                order_details_seri = OrderDetailSerializer(order_details, many = True)
                order_dict = {"order":order_seri.data,
                              "details":order_details_seri.data}
                all_orders_data.append(order_dict)
                
            output = all_orders_data
            return Response({"orders and details":output}, status=status.HTTP_200_OK)
        
        except Order.DoesNotExist:
            output = f"No orders found."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_orders_by_branch',branch_id,output)   
    
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated,IsAdminUser]) 
    def get_all_orders(request):
        try:
            orders = Order.objects.all()
            all_orders_data = []
            for order in orders:
                order_dict = data_constructor.parse_order(order)
                all_orders_data.append(order_dict)
                
            output = all_orders_data
            return Response({"all_orders":output}, status=status.HTTP_200_OK)
        
        except Order.DoesNotExist:
            output = f"No orders found."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_all_orders',None,output)   
    
  
    @api_view(['GET'])
    @permission_classes([IsAuthenticated,IsAdminUser]) 
    def get_requres_attention_orders(request):
        try:
            orders = Order.objects.all()
            filtered_orders_data = []
            for order in orders:
                order_details = OrderDetails.objects.filter(order=order)

                all_approved = all(detail.approved_to_ship == 1 for detail in order_details) 
                unnaproved = False if all_approved else True
                
                all_sent_to_supplier = all(detail.sent_to_supplier == 'true' for detail in order_details) 
                not_sent = False if all_sent_to_supplier else True

                if unnaproved or not_sent:
                        order_dict = data_constructor.parse_order(order)
                        filtered_orders_data.append(order_dict)
                
            output = filtered_orders_data
            return Response({"requring_attention_orders": output}, status=status.HTTP_200_OK)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_requres_attention_orders',None,output)   
            
              
    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def get_filtered_orders(request):
        try:
            id = request.GET.get('id', 'all')
            branch = request.GET.get('branch', 'all')
            area = request.GET.get('area', 'all')
            start_date = request.GET.get('start_date', None)
            end_date = request.GET.get('end_date', None)
            sent_to_supplier = request.GET.get('sent_to_supplier', 'all')
            received = request.GET.get('received', 'all')
            approved_to_ship = request.GET.get('approved_to_ship', 'all')
            supplier = request.GET.get('supplier', 'all')

            filters = {}
            if id != 'all':
                orders = [Order.objects.get(pk=id)]
                
            else:
                if branch != 'all':
                    filters['branch'] = branch
                    
                if area != 'all':
                    filters['branch__area__id'] = area
                    
                if start_date and end_date :
                    start_date = datetime.strptime(start_date, '%Y-%m-%d')
                    end_date = datetime.strptime(end_date, '%Y-%m-%d')
                    filters['datetime__range'] = (start_date, end_date)

                if not filters:
                    orders = Order.objects.all()
                else:
                    orders = Order.objects.filter(**filters)
                
            if orders is None:
                orders = [Order.objects.none()]

            filtered_orders_data = []
            
            for order in orders:
                order_details = OrderDetails.objects.filter(order=order)

                recived_match = True
                if received != 'all':
                    all_received = all(detail.recived == 'true' for detail in order_details) 
                    if all_received:
                        recived_match = True if received == '1' else False
                    else:
                        recived_match = False if received == '1' else True
                
                approved_match = True
                if approved_to_ship != 'all':
                    all_approved = all(detail.approved_to_ship == 1 for detail in order_details) 
                    if all_approved:
                        approved_match = True if approved_to_ship == '1' else False
                    else:
                        approved_match = False if approved_to_ship == '1' else True
                
                sent_to_supplier_match = True
                if sent_to_supplier != 'all':
                    all_sent_to_supplier = all(detail.sent_to_supplier == 1 for detail in order_details) 
                    if all_sent_to_supplier:
                        sent_to_supplier_match = True if sent_to_supplier == '1' else False
                    else:
                        sent_to_supplier_match = False if sent_to_supplier == '1' else True
                
                supplier_match = True
                if supplier != 'all':
                    supplier_match = order_details.filter(item__supplier__id=int(supplier)).exists()

                if recived_match and approved_match and sent_to_supplier_match and supplier_match:
                        order_dict = data_constructor.parse_order(order)
                        filtered_orders_data.append(order_dict)
                
            output = filtered_orders_data
            return Response({"filtered_orders": output}, status=status.HTTP_200_OK)
        
        except Exception as e:
            output = str(e)
            return Response({"error": output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','get_filtered_orders', filters, output)
    
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated,IsAdminUser]) 
    def get_unshipped(request):
        try:
            filtred_order_details = OrderDetails.objects.filter(sent_to_supplier=False)
            parced_and_filtred_orders = data_constructor.parce_orders_for_suppliers(filtred_order_details)          
                
            output = parced_and_filtred_orders
            return Response({"unshipped_orders_by_supplier_then_branch": output}, status=status.HTTP_200_OK)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_unshipped',None,output)  
    
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def add_equpment_category(request):
        """
        13.06.24
        Args: POST, (body json data 'name')
        Returns: new_equpment_category + 201/ err + 400/500
        """
        try:
            serializer = EqupmentCategorySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = {'new_equpment_category': serializer.data}
                return Response(output, status=status.HTTP_201_CREATED)
            
            else:
                output = serializer.errors
                return Response({'err': output}, status=status.HTTP_400_BAD_REQUEST)
    
        except Exception as e:
            output = str(e)
            return Response({'err': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','add_equpment_category', request.data, output)
            
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def add_many_equpment_categories(request):
        """
        13.06.24
        Args: POST, (body json data {list:[]})
        Returns: new_cats + 201/ err + 400/500
        """
        try:
            cats = request.data.get('list', [])
            new_cats = []
            
            with transaction.atomic():
                for cat in cats:
                    cat_dict = {"name":cat}
                    serializer = EqupmentCategorySerializer(data=cat_dict)
                    if serializer.is_valid():
                        serializer.save()
                        new_cats.append(serializer.data)
                    
                    else:
                        transaction.set_rollback(True)
                        output = serializer.errors
                        return Response({'err': output}, status=status.HTTP_400_BAD_REQUEST)
                    
            output = {'new_cats': new_cats}
            return Response(output, status=status.HTTP_201_CREATED)
    
        except Exception as e:
            output = str(e)
            return Response({'err': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','add_many_equpment_categories', request.data, output)
            
            
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def update_equpment_category(request, equpment_cat_id):
        """
        19.06.24
        Args: PUT, equpment_cat_id (int) (body json data 'name')
        Returns: updated + 201/ not_found + 404 / err + 500
        """
        try:
            equpment_cat = EqupmentCategory.objects.get(pk=equpment_cat_id)
            serializer = EqupmentCategorySerializer(equpment_cat, data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = serializer.data
                return Response({"updated": output}, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except EqupmentCategory.DoesNotExist:
            output = f"No equpment category with id {equpment_cat_id} found"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','update_equpment_category', (request.data, equpment_cat_id), output)          
            
            
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def delete_equpment_category(request, equpment_cat_id):
        """
        20.06.24
        Args: DELETE, equipment_cat_id (int)
        Returns: deleted + 204/ not_found + 404 / err + 500
        """
        try:
            equipment_cat = EqupmentCategory.objects.get(pk=equpment_cat_id)
            equipment_cat.delete()
            output = 'deleted'
            return Response({"deleted": True}, status=status.HTTP_204_NO_CONTENT)
        
        except EqupmentCategory.DoesNotExist:
            output = f"No equipment category with id {equpment_cat_id} found"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err': output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','delete_equipment_category', (request.data, equpment_cat_id), output)  
                
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def get_filtered_equpment(request):
        try:
            equpment_cat = request.GET.get('equpment_cat', 'all')
            equpment_supplier = request.GET.get('equpment_supplier', 'all')
            equpment_status = request.GET.get('equpment_status', 'all')

            filters = {}

            if equpment_cat != 'all':
                filters['category'] = equpment_cat

            if equpment_supplier != 'all':
                filters['supplier'] = equpment_supplier
                
            if equpment_status != 'all':
                filters['active'] = equpment_status

            equpment = Equpment.objects.filter(**filters)

            filtered_equpment = []
            for item in equpment:
                parced_item = data_constructor.parce_item_of_equpment(item)
                filtered_equpment.append(parced_item)
                
            output = filtered_equpment
            return Response({"filtered_equpment": output}, status=status.HTTP_200_OK)
        
        except Exception as e:
            output = str(e)
            return Response({"error": output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','get_filtered_equpment', filters, output)
        
        
    @api_view(['POST'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def add_item_of_equpment(request):
        """
        15.06.24
        Args: POST, (body json data 'name', 'unit_measure', 'category', 'supplier', 'price', 'requres_approval')
        Returns: new item of equpment + 201/ err + 400/500
        """
        try:
            serializer = EqupmentSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = {'new_item_of_equpment': serializer.data}
                return Response(output, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','add_item_of_equpment', request.data, output)  
  
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])  
    def update_item_of_equpment(request, equpment_id):
        """
        19.06.24
        Args: PUT, equpment_id (int), (body json data 'name', 'unit_measure', 'category', 'supplier', 'price', 'requres_approval')
        Returns: updated + 201/ not_found + 404 / err + 500
        """
        try:
            equpment = Equpment.objects.get(pk=equpment_id)
            serializer = EqupmentSerializer(equpment, data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = serializer.data
                return Response({"updated": output}, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except Equpment.DoesNotExist:
            output = "No equpment  with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','update_item_of_equpment', (request.data, equpment_id), output)     
            
            
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])  
    def deactivate_equpment(request, equpment_id):
        """
        02.07.24
        Args: PUT, equpment_id (int)
        Returns: equpment_deactivated + 201/ not_found + 404 / err + 500
        """
        try:
            equpment = Equpment.objects.get(pk=equpment_id)
            if equpment:
                equpment.active = False
                equpment.save() 
                output = {"equpment_deactivated": equpment_id}
                return Response(output, status=status.HTTP_200_OK)
        
        except Equpment.DoesNotExist:
            output = "No equpment  with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','deactivate_equpment', (equpment_id), output)   
            
            
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])  
    def activate_equpment(request, equpment_id):
        """
        02.07.24
        Args: PUT, equpment_id (int)
        Returns: equpment_activated + 201/ not_found + 404 / err + 500
        """
        try:
            equpment = Equpment.objects.get(pk=equpment_id)
            if equpment:
                equpment.active = True
                equpment.save() 
                output = {"equpment_activated": equpment_id}
                return Response(output, status=status.HTTP_200_OK)
        
        except Equpment.DoesNotExist:
            output = "No equpment  with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','activate_equpment', (equpment_id), output)     
    
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def add_branch(request):
        """
        12.06.24
        Args: POST, (body json data 'name','area','next_order')
        Returns: new branch + 201/ err + 400/500
        """
        try:
            serializer = BranchSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = {'new_branch': serializer.data}
                return Response(output, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','add_branch', request.data, output)   
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])   
    def update_branch(request, branch_id):
        """
        19.06.24
        Args: PUT, branch_id (int), (body json data 'name','area','next_order')
        Returns: updated + 201/ not_found + 404 / err + 500
        """
        try:
            branch = Branch.objects.get(pk=branch_id)
            serializer = BranchSerializer(branch, data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = serializer.data
                return Response({"updated": output}, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except Branch.DoesNotExist:
            output = "No branch  with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','update_branch', (request.data, branch_id), output)        
            
            
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])   
    def activate_branch(request, branch_id):
        """
        10.07.24
        Args: PUT, branch_id (int)
        Returns: branch_activated + 201/ not_found + 404 / err + 500
        """
        try:
            branch = Branch.objects.get(pk=branch_id)
            if branch:
                branch.active = True
                branch.save() 
                output = {"branch_activated": branch_id}
                return Response(output, status=status.HTTP_201_CREATED)
        
        except Branch.DoesNotExist:
            output = "No branch  with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','activate_branch', (branch_id), output)   


    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])   
    def deactivate_branch(request, branch_id):
        """
        10.07.24
        Args: PUT, branch_id (int)
        Returns: branch_deactivated + 201/ not_found + 404 / err + 500
        """
        try:
            branch = Branch.objects.get(pk=branch_id)
            if branch:
                branch.active = False
                branch.save() 
                output = {"branch_deactivated": branch_id}
                return Response(output, status=status.HTTP_201_CREATED)
        
        except Branch.DoesNotExist:
            output = "No branch  with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','deactivate_branch', (branch_id), output)    
    
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated,IsAdminUser])
    def get_all_areas(request):
        """
        12.06.24
        Args: GET
        Returns: list of areas as jsons + 200/ not found str + 404 / err str + 500
        """
        try:
            area = Area.objects.all()
            seri = AreaSerializer(area, many = True)
            output = seri.data
            return Response({"all_areas":output}, status=status.HTTP_200_OK)
        
        except Branch.DoesNotExist:
            output = f"No Branches Found"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_all_areas',None,output)
    
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def add_area(request):
        """
        12.06.24
        Args: POST, (body json data 'name')
        Returns: new area + 201/ err + 400/500
        """
        try:
            serializer = AreaSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = {'new_area': serializer.data}
                return Response(output, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','add_area', request.data, output)
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])  
    def update_area(request, area_id):
        """
        19.06.24
        Args: PUT, area_id (int), (body json data 'name')
        Returns: updated + 201/ not_found + 404 / err + 500
        """
        try:
            area = Area.objects.get(pk=area_id)
            serializer = AreaSerializer(area, data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = serializer.data
                return Response({"updated": output}, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except Area.DoesNotExist:
            output = "No area with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','update_area', (request.data, area_id), output) 
    

    @api_view(['POST'])
    @permission_classes([IsAuthenticated,IsAdminUser])
    def get_supplier_by_id(request, supplier_id):
        try:
            supplier = Supplier.objects.get(pk = supplier_id)
            seri = SupplierSerializer(supplier)
            output = {"supplier":seri.data}
            return Response(output, status=status.HTTP_200_OK)
        
        except Supplier.DoesNotExist:
            output = f"No supplier with id {supplier_id}."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_supplier_by_id',supplier_id,output)
            
              
    @api_view(['POST'])
    @permission_classes([IsAuthenticated,IsAdminUser])
    def get_all_suppliers(request):
        """
        12.06.24
        Args: GET
        Returns: list of suppliers as jsons + 200/ not found str + 404 / err str + 500
        """
        try:
            supliers = Supplier.objects.all()
            parced_suppliers =[]
            for supplier in supliers:
                parced_supplier = data_constructor.parce_supplier(supplier)
                parced_suppliers.append(parced_supplier)
                
            output = parced_suppliers
            return Response({"all_suppliers":output}, status=status.HTTP_200_OK)
        
        except Branch.DoesNotExist:
            output = f"No Supliers Found"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_all_suppliers',None,output)
            
            
    @api_view(['POST'])
    @permission_classes([IsAuthenticated,IsAdminUser])
    def get_active_suppliers(request):
        """
        12.06.24
        Args: GET
        Returns: list of active suppliers as jsons + 200/ not found str + 404 / err str + 500
        """
        try:
            supliers = Supplier.objects.filter(active = True)
            parced_suppliers =[]
            for supplier in supliers:
                parced_supplier = data_constructor.parce_supplier(supplier)
                parced_suppliers.append(parced_supplier)
                
            output = parced_suppliers
            return Response({"active_suppliers":output}, status=status.HTTP_200_OK)
        
        except Branch.DoesNotExist:
            output = f"No Supliers Found"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','get_active_suppliers',None,output)
    
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated, IsAdminUser])    
    def add_supplier(request):
        """
        15.06.24
        Args: POST, (body json data 'name','contact_name','phone','email','active')
        Returns: new supplier + 201/ err + 400/500
        """
        try:
            serializer = SupplierSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = {'new_supplier': serializer.data}
                return Response(output, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','add_supplier', request.data, output)  
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])    
    def update_supplier(request, sup_id):
        """
        19.06.24
        Args: PUT, sup_id (int), (body json data 'name','contact_name','phone','email','active')
        Returns: updated + 201/ not_found + 404 / err + 500
        """
        try:
            sup = Supplier.objects.get(pk=sup_id)
            serializer = SupplierSerializer(sup, data=request.data)
            if serializer.is_valid():
                serializer.save()
                output = serializer.data
                return Response({"updated": output}, status=status.HTTP_201_CREATED)
            
            output = {'err':serializer.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except SupplierSerializer.DoesNotExist:
            output = "No supplier with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','update_supplier', (request.data, sup_id), output) 
            
            
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])    
    def activate_supplier(request, sup_id):
        """
        19.06.24
        Args: PUT, sup_id (int)
        Returns: supplier_activated + 201/ not_found + 404 / err + 500
        """
        try:
            sup = Supplier.objects.get(pk=sup_id)
            if sup:
                sup.active = True
                sup.save() 
                output = {"supplier_activated": sup_id}
                return Response(output, status=status.HTTP_201_CREATED)
            
        except SupplierSerializer.DoesNotExist:
            output = "No supplier with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','activate_supplier', (sup_id), output) 


    @api_view(['PUT'])
    @permission_classes([IsAuthenticated, IsAdminUser])    
    def deactivate_supplier(request, sup_id):
        """
        10.07.24
        Args: PUT, sup_id (int)
        Returns: supplier_deactivated + 201/ not_found + 404 / err + 500
        """
        try:
            sup = Supplier.objects.get(pk=sup_id)
            if sup:
                sup.active = False
                sup.save() 
                output = {"supplier_deactivated": sup_id}
                return Response(output, status=status.HTTP_201_CREATED)
            
        except SupplierSerializer.DoesNotExist:
            output = "No supplier with id given"
            return Response({"not_found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','deactivate_supplier', (sup_id), output) 
            
            
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated,IsAdminUser]) 
    def approve_order_detail(request, order_detail_id):
        try:
            od = OrderDetails.objects.get(pk = order_detail_id)
            if od:
                od.approved_to_ship = True
                od.save() 
                output = {"approved_to_ship":order_detail_id}
                return Response(output, status=status.HTTP_200_OK) 
        
        except OrderDetails.DoesNotExist:
            output = f"No order detail with id {order_detail_id}."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','approve_order_detail',order_detail_id,output)      
            
            
    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated,IsAdminUser]) 
    def remove_order_detail(request, order_detail_id):
        try:
            od = OrderDetails.objects.filter(pk = order_detail_id)
            if od:
                od.delete()
                output = {'detail_deleted':order_detail_id}
                return Response(output, status=status.HTTP_200_OK) 
        
        except OrderDetails.DoesNotExist:
            output = f"No order detail with id {order_detail_id}."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','approve_order_detail',order_detail_id,output)   
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated,IsAdminUser])    
    def send_order_to_supplier(request):
        try:
            details = request.data.get('details', [])
            with transaction.atomic():
                for detail in details: 
                    detail_obj = OrderDetails.objects.get(pk = detail)
                    if not detail_obj:
                        transaction.set_rollback(True)
                        output = 'no_detail'
                        return Response({'err': output}, status=status.HTTP_400_BAD_REQUEST)
                    
                    if detail_obj.approved_to_ship:
                        detail_obj.sent_to_supplier = True
                        detail_obj.save()
                        
                    else:
                        transaction.set_rollback(True)
                        output = 'unnaproved detail'
                        return Response({'err': output}, status=status.HTTP_400_BAD_REQUEST)
                
            output = {'sent_to_supplier':details}
            return Response(output, status=status.HTTP_200_OK) 
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('AdminViews','send_order_to_supplier',details if details else None,output)     
    
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated, IsAdminUser])
    def get_pdf_for_supplier(request):
        try:
            details_to_include = request.data.get('details',[])
            if not details_to_include:
                output = 'details_to_include err'
                return Response({"err":output}, status=status.HTTP_400_BAD_REQUEST)
            
            details = []
            for detail in details_to_include:
                detail_data = OrderDetails.objects.get(pk=detail)
                details.append(detail_data)
            
            parced_details = data_constructor.parce_data_for_pdf_for_supplier(details)
            header = parced_details['header']
            context = {'order': parced_details}
            html_str = render_to_string('order_for_supplier.html',context)
            pdf = HTML(string=html_str).write_pdf()
            pdf_buffer = BytesIO(pdf)
            
            response = FileResponse(pdf_buffer, content_type='application/pdf')  
            response['Content-Disposition'] = f'attachment; filename="{header}.pdf"'
            response['Content-Type'] = 'application/pdf'
            output = (response.headers, response.streaming_content)
            return response
                            
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','get_pdf_for_supplier',details_to_include if details_to_include else None,output) 
            
            
    @api_view(['POST'])
    @permission_classes([IsAuthenticated,IsAdminUser])
    def send_email(request):
        try:
            recipients = request.POST.getlist('recipients[]')
            message = request.data.get('message')
            headline = request.data.get('headline')
            pdf = request.FILES.get('pdf', None)
            
            pdf_file = BytesIO(pdf.read())
            pdf_filename = pdf.name
            
            sent , failed_recipients = email_handler.send_email(message, recipients, headline, pdf_file, pdf_filename)
            if failed_recipients:
                output = {'failed_to_send': failed_recipients.keys()}
            else:
                output = {'sent_sucsessfuly': True}
            
            return Response(output, status=status.HTTP_200_OK)
            
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AdminViews','send_email',
                       (recipients if recipients else None,
                        message if message else None,
                        headline if headline else None)
                       ,output) 
