from flask import Blueprint
from .controllers import video_controller

main_routes = Blueprint('main', __name__)

@main_routes.route('/videos', methods=['POST'])
def add_video():
    return video_controller.add_video_controller()

@main_routes.route('/videos', methods=['GET'])
def get_videos():
    return video_controller.get_videos_controller()

@main_routes.route('/videos/<video_id>', methods=['DELETE'])
def delete_video(video_id):
    return video_controller.delete_video_controller(video_id)
