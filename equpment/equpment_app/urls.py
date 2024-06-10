from django.urls import path
from .views.anon_views import AnonViews
from .views.user_views import UserViews
from .views.admin_views import AdminViews

urlpatterns = [
    # anon views
    path('sign_up/',AnonViews.sign_up),
    # user views
    path('get_all_branches/',UserViews.get_all_branches),
    # admin views
    path('add_area/',AdminViews.add_area),
    path('add_branch/',AdminViews.add_branch),
]