"""
WSGI config for equpment project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
import threading
import schedule
import time
from equpment_app.management.commands.run_scheduled_tasks import reset_next_order_date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'equpment.settings')

application = get_wsgi_application()

def scheduler_thread():
    schedule.every().day.at("00:01").do(reset_next_order_date)
    while True:
        schedule.run_pending()
        time.sleep(60) 

thread = threading.Thread(target=scheduler_thread)
thread.daemon = True
thread.start()
