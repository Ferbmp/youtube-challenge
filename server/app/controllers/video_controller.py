from flask import request, jsonify
from ..use_cases.add_video import add_video
from ..use_cases.get_videos import get_videos
from ..use_cases.delete_video import delete_video
from ..repositories.sqlite_repository import SQLiteRepository
from ..services.youtube_service import YouTubeService
from .. import redis_client  
from ..repositories.redis_repository import RedisRepository

redis_repository = RedisRepository(redis_client)
video_repository = SQLiteRepository()
youtube_service = YouTubeService()

def add_video_controller():
    data = request.get_json()
    url = data.get('url')
    result = add_video(url, video_repository, youtube_service, redis_repository)

    if 'message' in result and result['message'] == "Video already exists.":
        return jsonify(result), 409

    return jsonify(result), 201 if 'error' not in result else 400

def get_videos_controller():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    
    videos = get_videos(video_repository, redis_repository, page, per_page)
    return jsonify(videos), 200


def delete_video_controller(video_id: str):
    result = delete_video(video_id, video_repository, redis_repository)
    if 'error' in result:
        return jsonify(result), 404
    return jsonify(result), 200