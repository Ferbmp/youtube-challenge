from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
from flask_migrate import Migrate
import redis
from flask_cors import CORS
import click
import sqlite3
import os

db = SQLAlchemy()

def create_app(testing: bool = False):
    app = Flask(__name__)

    CORS(app)

    if testing:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_videos.db'
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///videos.db'

    global redis_client

    redis_host = os.getenv('REDIS_HOST', 'localhost')

    if testing:
            redis_client = redis.Redis(host=redis_host, port=6379, db=1)
    else:
            redis_client = redis.Redis(host=redis_host, port=6379, db=0)


    db.init_app(app)

    from .models.video_model import VideoModel

    with app.app_context():
        db.create_all()

    migrate = Migrate(app, db)

    try:
        redis_client.ping()
        print("Conexão com o Redis bem-sucedida!")
    except redis.ConnectionError:
        print("Falha ao conectar com o Redis. Verifique se o Redis está em execução.")

    SWAGGER_URL = '/swagger'
    API_URL = '/static/swagger.json'
    swaggerui_blueprint = get_swaggerui_blueprint(SWAGGER_URL, API_URL)
    app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

    from .routes import main_routes
    app.register_blueprint(main_routes)

    @app.cli.command("seed")
    def seed():
        conn = sqlite3.connect("instance/videos.db")
        cursor = conn.cursor()
        with open("infrastructure/scripts/seed_videos.sql", "r") as seed_file:
            cursor.executescript(seed_file.read())
        conn.commit()
        conn.close()
        click.echo("Seed executado com sucesso!")

    return app
