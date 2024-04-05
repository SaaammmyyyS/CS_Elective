from django.urls import path
from .views import RegisterView, LoginView, UserView, LogoutView, UserDeleteView, AllUsersView
from . import views

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('user/delete/', UserDeleteView.as_view(), name='user-delete'),
    path('user/update/', UserView.as_view(), name='update_user'),
    path('all/users/', AllUsersView.as_view())
]