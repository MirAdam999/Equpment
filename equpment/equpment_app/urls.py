from django.urls import path
from .views.anon_views import AnonViews
from .views.user_views import UserViews
from .views.admin_views import AdminViews

urlpatterns = [
    # anon views
    path('login/',AnonViews.login), # tested
    path('logout/<str:token>/',AnonViews.logout), # tested
    
    # user views
    path('get_all_branches/',UserViews.get_all_branches), # tested
    path('get_active_branches/',UserViews.get_active_branches), # tested
    path('get_branch/<int:branch_id>/',UserViews.get_branch), # tested
    path('get_equpment_categories/',UserViews.get_equpment_categories), # tested
    path('get_equpment_by_category/<int:cat_id>/',UserViews.get_equpment_by_category), # tested
    path('view_orders_by_branch/<int:branch_id>/',UserViews.view_orders_by_branch), # tested
    path('add_order/',UserViews.add_order), # tested 
    path('view_order_by_id/<int:order_id>/',UserViews.view_order_by_id),  # tested
    path('approve_delivery/<int:order_detail_id>/',UserViews.approve_delivery),  # tested
    path('get_self/',UserViews.get_self), # tested 
    path('update_profile/',UserViews.update_profile), # tested
    path('update_password/',UserViews.update_password), # tested
    path('change/',UserViews.change), # pakapaka
    
    # admin views
    path('add_user/',AdminViews.add_user), # tested
    path('get_all_areas/',AdminViews.get_all_areas),
    path('add_area/',AdminViews.add_area), # tested
    path('update_area/<int:area_id>/',AdminViews.update_area), # tested
    path('add_branch/',AdminViews.add_branch), # tested
    path('update_branch/<int:branch_id>/',AdminViews.update_branch), # tested
    path('activate_branch/<int:branch_id>/',AdminViews.activate_branch),
    path('deactivate_branch/<int:branch_id>/',AdminViews.deactivate_branch),
    path('add_equpment_category/',AdminViews.add_equpment_category), # tested
    path('update_equpment_category/<int:equpment_cat_id>/',AdminViews.update_equpment_category), # tested
    path('delete_equpment_category/<int:equpment_cat_id>/',AdminViews.delete_equpment_category), 
    path('add_many_equpment_categories/',AdminViews.add_many_equpment_categories), # tested
    path('get_filtered_equpment/',AdminViews.get_filtered_equpment), # tested
    path('add_item_of_equpment/',AdminViews.add_item_of_equpment), # tested
    path('update_item_of_equpment/<int:equpment_id>/',AdminViews.update_item_of_equpment), # tested
    path('activate_equpment/<int:equpment_id>/',AdminViews.activate_equpment), # tested
    path('deactivate_equpment/<int:equpment_id>/',AdminViews.deactivate_equpment), # tested
    path('get_all_suppliers/',AdminViews.get_all_suppliers), # tested
    path('get_active_suppliers/',AdminViews.get_active_suppliers), 
    path('add_supplier/',AdminViews.add_supplier), # tested
    path('update_supplier/<int:sup_id>/',AdminViews.update_supplier), # tested
    path('activate_supplier/<int:sup_id>/',AdminViews.activate_supplier),
    path('deactivate_supplier/<int:sup_id>/',AdminViews.deactivate_supplier),
    path('get_user_by_id/<int:user_id>/',AdminViews.get_user_by_id), # tested
    path('get_all_users/',AdminViews.get_all_users), # tested
    path('get_filtered_users/',AdminViews.get_filtered_users), # tested
    path('disactivate_user/<int:user_id>/',AdminViews.disactivate_user), # tested
    path('activate_user/<int:user_id>/',AdminViews.activate_user), # tested
    path('make_admin/<int:user_id>/',AdminViews.make_admin), # tested
    path('revoke_admin/<int:user_id>/',AdminViews.revoke_admin), # tested
    path('get_all_orders/',AdminViews.get_all_orders), # tested
    path('get_filtered_orders/',AdminViews.get_filtered_orders), # tested
    path('get_requres_attention_orders/',AdminViews.get_requres_attention_orders), # tested
    path('approve_order_detail/<int:order_detail_id>/',AdminViews.approve_order_detail), # tested
    path('remove_order_detail/<int:order_detail_id>/',AdminViews.remove_order_detail),  # tested
    path('get_unshipped_orders/',AdminViews.get_unshipped_orders), 
]