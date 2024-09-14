
FROM python:3.11


ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


WORKDIR /usr/src/app


COPY requirements.txt /usr/src/app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt


COPY . /usr/src/app/


COPY .env /usr/src/app/


EXPOSE 5000


CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]