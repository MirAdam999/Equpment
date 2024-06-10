from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..models import *
from ..serializer import UserLoginSerializer, UserSignUpSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate

class AnonViews():
    def __init__(self):
        pass

    @api_view(['POST'])
    def login(request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            password = serializer.data['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key}, status=status.HTTP_200_OK)
            
            return Response({'wrong': 'Wrong Username/Password'}, status=status.HTTP_401_UNAUTHORIZED)
        
        return Response({'err':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


    @api_view(['POST'])
    def sign_up(request):
        serializer = UserSignUpSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_201_CREATED)
        
        return Response({'err': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    
    @api_view(['DELETE'])
    def logout(request, token):
        try:
            found_token = Token.objects.get(key=token)
            
        except Token.DoesNotExist:
            return Response({"err": "Token not found"}, status=status.HTTP_404_NOT_FOUND)

        found_token.delete()
        return Response({'logout':True},status=status.HTTP_204_NO_CONTENT) 