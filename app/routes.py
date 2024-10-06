from flask import Blueprint, request, jsonify
from .controllers import video_controller

main_routes = Blueprint('main', __name__)

@main_routes.route('/videos', methods=['POST'])
def add_video():
    url = request.json.get('url')
    response = video_controller.add_video(url)
    return jsonify(response), 201

@main_routes.route('/videos', methods=['GET'])
def get_videos():
    return jsonify(video_controller.get_videos()), 200
