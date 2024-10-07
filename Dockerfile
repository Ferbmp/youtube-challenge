# Usar imagem base do Python
FROM python:3.10-slim


WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

 
ENV YOUTUBE_API_KEY=AIzaSyC1Xtps7q63OyvIE3wf1Idjpt19uppLVj0
 
CMD ["flask", "run", "--host=0.0.0.0"]
