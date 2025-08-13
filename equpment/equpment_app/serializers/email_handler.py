import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
import os
from ..log.logger import Logger

logger = Logger()

class EmailHandler:
    def __init__(self):
        self.org_email_address = os.environ.get('EMAIL_ADDRESS')
        self.email_pass = os.environ.get('EMAIL_PASSWORD')
        
    def send_email(self, message, recipients, headline, pdf_file=None, pdf_filename=None):
        try:
            email_sender = self.org_email_address
            password = self.email_pass
            
            failed_recipients = {}
            for recipient in recipients:
                try:
                    msg = MIMEMultipart()
                    msg['From'] = email_sender
                    msg['To'] = recipient
                    msg['Subject'] = headline
                    msg.attach(MIMEText(message, 'plain'))
                    
                    if pdf_file:
                        part = MIMEApplication(pdf_file.read(),  Name=pdf_filename)
                        part['Content-Disposition'] = f'attachment; filename="{pdf_filename}"'
                        msg.attach(part)

                    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                        smtp.login(email_sender, password)
                        smtp.send_message(msg)

                except Exception as e:
                    failed_recipients[recipient]= str(e)

            if failed_recipients:
                output = failed_recipients
                return False, failed_recipients
            
            else:
                output = True
                return True, failed_recipients
        
        except Exception as e:
            output = str(e)
            return False, {}
        
        finally:
            logger.log('EmailHandler','send_email',(message, recipients, headline),output) 
        
        
        