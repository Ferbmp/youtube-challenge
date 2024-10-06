from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
from flask_migrate import Migrate
import redis

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///videos.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    global redis_client
    redis_client = redis.Redis(host='localhost', port=6379, db=0)
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

    return app
