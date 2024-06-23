
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .anon_views import AnonViews
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from ..models import *
from ..serializers.serializer import *
from ..log.logger import Logger
from ..serializers.data_manipulation import DataConstructor

logger = Logger()

class UserViews(AnonViews):
    def __init__(self) -> None:
        super().__init__()
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def get_all_branches(request):
        """
        12.06.24
        Args: GET
        Returns: list of branches as jsons + 200/ not found str + 404 / err str + 500
        """
        try:
            branch = Branch.objects.all()
            seri = BranchSerializer(branch, many = True)
            output = seri.data
            return Response({"all_branches":output}, status=status.HTTP_200_OK)
        
        except Branch.DoesNotExist:
            output = f"No Branches Found"
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('UserViews','get_all_branches',None,output)
    
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def get_branch(request, branch_id):
        """
        12.06.24
        Args: GET, branch_id(int)
        Returns: branch json + 200/ not found str + 404 / err str + 500
        """
        try:
            branch = Branch.objects.get(pk = branch_id)
            seri = BranchSerializer(branch)
            output = seri.data
            return Response({"branch":output}, status=status.HTTP_200_OK)
        
        except Branch.DoesNotExist:
            output = f"Branch with id {branch_id} does not exist."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('UserViews','get_branch',branch_id,output)
            
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def get_equpment_categories(request):
        """
        12.06.24
        Args: GET
        Returns: list of categories as jsons + 200/ not found str + 404 / err str + 500
        """
        try:
            cats = EqupmentCategory.objects.all()
            seri = EqupmentCategorySerializer(cats, many = True)
            output = seri.data
            return Response({"all_cats":output}, status=status.HTTP_200_OK)
        
        except Branch.DoesNotExist:
            output = f"No Branches Found"
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('UserViews','get_equpment_categories',None,output)    
    
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def get_equpment_by_category(request, cat_id):
        """
        12.06.24
        Args: GET
        Returns: list of equpments as jsons + 200/ not found str + 404 / err str + 500
        """
        try:
            equpment = Equpment.objects.filter(category = cat_id)
            seri = EqupmentSerializer(equpment, many = True)
            output = {"equpment":seri.data}
            return Response(output, status=status.HTTP_200_OK)
        
        except Equpment.DoesNotExist:
            output = f"No equpment under cat with id {cat_id}."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('UserViews','get_equpment_by_category',cat_id,output)
    
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def view_order_by_id(request, order_id):
        """
        12.06.24
        Args: GET, order_id(int)
        Returns: tupple order and list json order details + 200/ not found str + 404 / err str + 500
        """
        try:
            order = Order.objects.get(pk = order_id)
            order_seri = OrderSerializer(order)
            order_details = OrderDetails.objects.filter(order = order_id)
            order_details_seri = OrderDetailSerializer(order_details, many = True)
            output = (order_seri.data, order_details_seri.data)
            return Response({"order and details":output}, status=status.HTTP_200_OK)
        
        except Order.DoesNotExist:
            output = f"Order with id {order_id} does not exist."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('UserViews','view_order_by_id',order_id,output)    
    
    
    @api_view(['GET'])
    @permission_classes([IsAuthenticated])
    def view_orders_by_branch(request, branch_id):
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
            output = f"No orders for branch with id {branch_id}."
            return Response({"not found": output}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            output = str(e)
            return Response({"err":str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('UserViews','view_orders_by_branch',branch_id,output)     
    
    
    @api_view(['POST'])
    @permission_classes([IsAuthenticated])
    def add_order(request):
        """
        15.06.24
        Creates order and each order detail. If any part of the transaction failes, rollbacks all transaction.
        Args: POST, order data format: {
                                        order:{
                                                branch:data
                                                },
                                        details:{
                                                1:{
                                                    item:data,
                                                    quantity:data
                                                    },
                                                2:{
                                                    ...
                                                    }
                                                }
                                        }
        Returns: new_order aka dict of order and deatils(like input) + 201/ err + 400/500
        """
        try:
            order_data = request.data.get('order', {})
            order_details = request.data.get('details', {})
            # Fetch user id using token
            order_data['user'] = request.user.id
            order_serializer = OrderSerializer(data=order_data)
            if order_serializer.is_valid():
                with transaction.atomic():
                    # Save order, on faliure rollback
                    order = order_serializer.save()
                    if not order:
                        transaction.set_rollback(True)
                        output = order_serializer.errors
                        return Response({'err': output}, status=status.HTTP_400_BAD_REQUEST)
                    
                    # Start dealing with details
                    details = []
                    for key, detail in order_details.items():
                        detail['order'] = order.id  # Set the order ID for each detail
                        item = Equpment.objects.get(pk = int(detail['item']))
                        item_seri = EqupmentSerializer(item)
                        item_data = item_seri.data
                        detail['approved_to_ship'] = True if item_data.requres_approval == False else False
                        detail_serializer = OrderDetailSerializer(data=detail)
                        
                        # Save detail, on faliure rollback
                        if detail_serializer.is_valid():
                            detail_serializer.save()
                            details.append(detail_serializer.data)
                            
                        else:
                            transaction.set_rollback(True)
                            output = detail_serializer.errors
                            return Response({'err': output}, status=status.HTTP_400_BAD_REQUEST)

                # Transaction sucsess
                output = {'order': order_serializer.data, 'details': details}
                return Response({'new_order':output}, status=status.HTTP_201_CREATED)
            
            # Bad order request   
            else:
                output = order_serializer.errors
                return Response({'err': output}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            output = str(e)
            return Response({'err': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        finally:
            logger.log('UserViews','add_order', request.data, output)
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def approve_delivery(request, order_detail_id):
        try:
            order_detail = OrderDetails.objects.get(pk = order_detail_id)
            if order_detail:
                order_detail.recived = True
                output = True
                return Response({"approved_delivery":order_detail_id}, status=status.HTTP_200_OK) 
            
            output = f'No order deatil by id {order_detail_id}'
            return Response({"not_found":output}, status=status.HTTP_404_NOT_FOUND) 
        
        except Exception as e:
            output = str(e)
            return Response({'err': output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('UserViews','approve_delivery', order_detail_id, output)
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def update_profile(request):
        try:
            user = request.user
            password = request.data.get('password')
            username = request.data.get('username')
            email = request.data.get('email')
            name = request.data.get('name')
            default_branch = request.data.get('default_branch')
            
            if not user.check_password(password):
                output = 'Invalid Password'
                return Response({'wrong': output}, status=status.HTTP_400_BAD_REQUEST)
            
            existing_username = User.objects.filter(username=username)
            if existing_username and existing_username[0] != user:
                output = 'User with Username exist, pick different username.'
                return Response({'wrong': output}, status=status.HTTP_400_BAD_REQUEST)
            
            existing_email = User.objects.filter(email=email)
            if existing_email and existing_email[0] != user:
                output = 'User with Email given already exist.'
                return Response({'wrong': output}, status=status.HTTP_400_BAD_REQUEST)
            
            seri = UserSerializer(user, data={"username":username,
                                              "email":email,
                                              "name":name,
                                              "default_branch":default_branch})
            if seri.is_valid():
                seri.save()
                output = seri.data
                return Response({"updated": output}, status=status.HTTP_201_CREATED)
            
            output = {'err':seri.errors}
            return Response(output, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('UserViews','update_profile', (user,username,email,name,default_branch), output)  
    
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def update_password(request):
        try:
            user = request.user
            old_password = request.data.get('old_password')
            new_password = request.data.get('new_password')
            
            if not old_password or not new_password:
                output = 'Both old and new passwords are required.'
                return Response({'wrong': output}, status=status.HTTP_400_BAD_REQUEST)
            
            if not user.check_password(old_password):
                output = 'Invalid old password'
                return Response({'wrong': output}, status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(new_password)
            user.save()
            
            output = 'Password updated successfully'
            return Response({'updated': output}, status=status.HTTP_200_OK)
        
        except Exception as e:
            output = str(e)
            return Response({'err':output}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('UserViews','update_password', user, output)  
            
    
    @api_view(['PUT'])
    @permission_classes([IsAuthenticated])
    def change(request):
        user = request.user
        pas = request.data.get('pas')
        user.set_password(pas)
        user.save()
        return Response({'updated': pas}, status=status.HTTP_200_OK)
