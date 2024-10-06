from flask import Blueprint
from .controllers.video_controller import add_video_controller, get_videos_controller

main_routes = Blueprint('main', __name__)

main_routes.route('/videos', methods=['POST'])(add_video_controller)
main_routes.route('/videos', methods=['GET'])(get_videos_controller)
