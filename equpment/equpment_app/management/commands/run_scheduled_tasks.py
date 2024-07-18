
from ...log.logger import Logger
from datetime import datetime
from ...models import Branch
from django.core.management.base import BaseCommand
import schedule
import time

logger = Logger()

def reset_next_order_date():
    try:
        branches = Branch.objects.all()
        today = datetime.now().date() 
        
        if branches.exists():
            for branch in branches:
                next_order = branch.next_order
                if next_order and today > next_order:
                    branch.next_order = None
                    branch.save() 
            
            output = 'good run'
            return 
        
        output = 'no branches'
        return
    
    except Exception as e:
        output = str(e)
        return 
        
    finally:
        print('reset_next_order_date',output)
        logger.log('Celery Tasks','reset_next_order_date',today,output)  


class Command(BaseCommand):
    help = 'Runs scheduled tasks'

    def handle(self, *args, **kwargs):
        schedule.every().day.at("00:01").do(reset_next_order_date)

        while True:
            schedule.run_pending()
            time.sleep(60)  