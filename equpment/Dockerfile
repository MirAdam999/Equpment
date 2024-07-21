# Use the official Python image from the Docker Hub
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /usr/src/app

# Install dependencies
COPY requirements.txt /usr/src/app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy project
COPY . /usr/src/app/

# Add environment variables from .env file
COPY .env /usr/src/app/

# Expose the port the app runs on
EXPOSE 5000

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:5000"]