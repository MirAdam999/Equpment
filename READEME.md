Equipment Order Management System
This is an Equipment Order Management System built using Django, React, and MySQL. The project was inspired by my desire to practice Django skills and to improve upon the equipment ordering system used at the clinic network where I previously worked. The system is designed to be a web application with a simple and user-friendly interface, primarily in Hebrew.

Features
Branch Admin Interface:
Easy Order Creation: Allows branch admins to create orders with a categorized view of available equipment.
Order Status Tracking: Track the status of orders from creation to fulfillment.
Order Confirmation: Confirm the receipt of equipment at the branch.
Branch Switching: Easily switch between branches for ordering or tracking purposes.
Profile Management: Update personal information and change passwords.
Global Admin Interface:
Management of Branches, Suppliers, and Equipment: View, create, and update branches, suppliers, equipment items, and categories.
User Management: Create new users (external registration is not available), view users, promote them to admins, or block them from the system.
Approval System: Flag certain equipment items as "Manager Approval Required." Orders containing these items will need national admin approval before being sent to suppliers.
Order Monitoring: View orders requiring attention (those not yet sent to suppliers or containing items requiring approval).
Order Filtering: Filter orders based on various criteria.
Order Dispatch: Generate Word files for orders by branch and supplier, which can be annotated and sent to suppliers. Future updates plan to send PDF orders directly via email.
Security
User Authentication: The system uses Django's Token Authentication for user identification and stores passwords hashed in the database.
Technologies
Backend: Django, MySQL
Frontend: React
Future Plans
Mobile Compatibility: Currently, the system is designed for desktop use only. Future updates will include mobile support.
Direct PDF Dispatch: Automate the process of sending PDF order files directly to supplier email addresses.
Usage Analytics: Implement periodic consumption average calculations for each branch, region, and national level.
Client Requests: Any additional features as requested by clients.
Live Demo
The live demo of the system showcases a fictional multi-branch clinic inspired by the original project concept. Please note that the demo is intended for desktop use only at this time.

Screenshots:

Branch Manager Interface:

![create-order](./screenshots/create-order.png)
![my-profile](./screenshots/my-profile.png)

Global Manager Interface:

![mange-equpment-items](./screenshots/mange-equpment-items.png)
![admin-orders](./screenshots/admin-orders.png)
![send-to-supplier](./screenshots/send-to-supplier.png)
