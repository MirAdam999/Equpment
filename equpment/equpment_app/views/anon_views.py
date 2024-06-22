from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from ..models import *
from ..serializer import UserSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from ..log.logger import Logger

logger = Logger()

class AnonViews:
    def __init__(self):
        pass

    @api_view(['POST'])
    @permission_classes([AllowAny])
    def login(request):
        """
        12.06.24
        Args: POST
        Returns: token (str) and user (json) + 200/ wrong (str) + 400 / wrong (str) + 401 / err (str) + 500
        """
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            if username is None or password is None:
                output = {'wrong': 'Username and Password are required.'}
                return Response(output, status=status.HTTP_400_BAD_REQUEST)
            
            user = authenticate(username=username, password=password)
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                seri = UserSerializer(user)
                seri_data = seri.data
                user_data_for_frontend = {
                    'default_branch':seri_data.get('default_branch', None)
                }
                output = True
                return Response({'token': token.key, 'user': user_data_for_frontend}, status=status.HTTP_200_OK)
            
            output = {'wrong': 'Wrong Username/Password'}
            return Response(output, status=status.HTTP_401_UNAUTHORIZED)
        
        except Exception as e:
            output = str(e)
            return Response({'err': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        finally:
            logger.log('AnonViews','login',(username if username else None),output)
    
     
    @api_view(['DELETE'])
    @permission_classes([AllowAny])
    def logout(request, token):
        """
        12.06.24
        Args: DELETE, token (str)
        Returns: logout True + 204 / not found (str) + 404 / err (str) + 500
        """
        try:
            found_token = Token.objects.get(key=token)
            found_token.delete()
            output = {'logout':True}
            return Response(output,status=status.HTTP_204_NO_CONTENT) 
            
        except Token.DoesNotExist:
            output = {"not found": "Token not found"}
            return Response(output, status=status.HTTP_404_NOT_FOUND) 

        except Exception as e:
            output = str(e)
            return Response({'err':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            logger.log('AnonViews','logout',token,output)
            
            