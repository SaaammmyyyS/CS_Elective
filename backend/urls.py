from django.urls import path
from .views import JobStreetView, RegisterView, LoginView, UserView, LogoutView, UserDeleteView, AllUsersView
from . import views

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user', UserView.as_view()),
    path('logout', LogoutView.as_view()),
    path('user/delete/', UserDeleteView.as_view(), name='user-delete'),
    path('user/update/', UserView.as_view(), name='update_user'),
    path('all/users/', AllUsersView.as_view()),
    path('job-street-scrape/', JobStreetView.as_view(), name='job_street_view'),
    path('job-listings/', JobStreetView.as_view(), name='job_listings'),
]