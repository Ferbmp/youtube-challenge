from flask import request, jsonify
from .. import redis_client

from ..use_cases.add_video import add_video
from ..use_cases.get_videos import get_videos
from ..use_cases.delete_video import delete_video

from ..repositories.implementations.sqlite_repository import SQLiteRepository
from ..repositories.implementations.redis_repository import RedisRepository
from ..repositories.implementations.youtube_repository import YouTubeRepository

 
video_repository = SQLiteRepository()
 
redis_repository = RedisRepository(redis_client, video_repository)
youtube_repository = YouTubeRepository()

def add_video_controller():
    data = request.get_json()
    url = data.get('url')
    result = add_video(url, video_repository, youtube_repository, redis_repository)

    if 'message' in result and result['message'] == "Video already exists.":
        return jsonify(result), 409

    return jsonify(result), 201 if 'error' not in result else 400

def get_videos_controller():
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('per_page', default=10, type=int)
    
    result = get_videos(page, per_page, redis_repository, video_repository)
    
    return jsonify(result), 200

def delete_video_controller(video_id: str):
    result = delete_video(video_id, video_repository, redis_repository)
    if 'error' in result:
        return jsonify(result), 404
    return jsonify(result), 200
