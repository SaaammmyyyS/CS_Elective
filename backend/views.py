from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from .serializers import UserSerializer
from .models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
import jwt, datetime


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=False)
        response.data = {
            'jwt': token
        }

        return response

class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(jwt=token, key='secret', algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

    def put(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(jwt=token, key='secret', algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()

        new_email = request.data.get('email')
        if new_email:
            user.email = new_email
            user.save()
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Email not provided'}, status=400)

class UserDeleteView(APIView):
    def delete(self, request):
        try:
            token = request.COOKIES.get('jwt')  

            if not token:
                raise AuthenticationFailed('Unauthenticated!')

            try:
                payload = jwt.decode(jwt=token, key='secret', algorithms=["HS256"])
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed('Token expired')
            except jwt.InvalidTokenError:
                raise AuthenticationFailed('Invalid token')

            user_id = payload['id']
            user = get_object_or_404(User, id=user_id)

            try:
                user.delete()
                return Response({"message": "User deleted"}, status=status.HTTP_204_NO_CONTENT)
            except Exception as e:
                print("Error deleting user:", e) 
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except AuthenticationFailed as e:
            return Response({"error": str(e)}, status=status.HTTP_401_UNAUTHORIZED)
        
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            "message": "success"
        }

        return response

class AllUsersView(APIView):
    pagination_class = PageNumberPagination
    paginate_by = 10
    
    def get(self,request,  *args, **kwargs):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(jwt=token, key='secret', algorithms=["HS256"])
            queryset = User.objects.all()
            paginator = self.pagination_class()
            paginated_queryset = paginator.paginate_queryset(queryset, request)
            serializer = UserSerializer(paginated_queryset, many=True)
            return paginator.get_paginated_response(serializer.data)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')
       
        

