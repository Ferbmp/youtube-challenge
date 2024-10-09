FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y sqlite3

COPY . .

EXPOSE 5000

ENV RUN_SEED=false

CMD if [ "$RUN_SEED" = "true" ]; then \
        echo "Rodando seed..."; \
        sqlite3 /app/instance/videos.db ".read /app/infrastructure/scripts/seed_videos.sql"; \
    fi && \
    echo "Iniciando o servidor Flask..." && \
    flask run --host=0.0.0.0
