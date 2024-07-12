import json
import os
from datetime import datetime
import tempfile

class Logger(object):
    _instance = None
    _log_file = './equpment_app/log/log.json'
    
    def __new__(cls, log_file=_log_file):
        if cls._instance is None:
            cls._instance= super(Logger,cls).__new__(cls)
            # Creating the log file as part of the instance creation, if not already exists
            if not os.path.exists(log_file):
                with open(log_file, 'w') as file:
                    file.write('[]')
            cls._instance._log_file = log_file
            
        return cls._instance
    
    def __init__(self,  max_entries=1000):
        self.max_entries = max_entries


    @property
    def log_path(self):
        return self._log_file
       
        
    def log(self, class_name, func_name, func_input, func_output):
        entries = self._load_entries()
        id = len(entries) + 1
        log_entry = {
            'id': id,
            'datetime': str(datetime.now()),
            'class_name': str(class_name),
            'func_name': str(func_name),
            'func_input': str(func_input),
            'func_output': str(func_output)
        }
        
        try:
            self._add_entry(log_entry)
                
        except Exception as e:
            return str(e)
        
        
    def _add_entry(self, entry):
        entries = self._load_entries()
        entries.append(entry)
        if len(entries) > self.max_entries:
            entries = entries[self.max_entries:]
        self._save_entries(entries)


    def _load_entries(self):
        try:
            with open(self.log_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        except FileNotFoundError:
            return []
            
    
    def _save_entries(self, entries):
        temp_log_file = None
        try:
            # Use a temporary file to ensure atomic writes
            temp_log_file = tempfile.NamedTemporaryFile('w', delete=False, encoding='utf-8')
            json.dump(entries, temp_log_file, indent=2, ensure_ascii=False)
            temp_log_file.close()
            os.replace(temp_log_file.name, self._log_file)
        except Exception as e:
            if temp_log_file is not None:
                os.remove(temp_log_file.name)
        
        