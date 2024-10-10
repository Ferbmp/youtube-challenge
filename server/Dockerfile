FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y sqlite3

COPY . .

EXPOSE 5000

CMD echo "Iniciando o servidor Flask..." && \
    flask run --host=0.0.0.0
