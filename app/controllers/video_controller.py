from flask import request, jsonify
from ..use_cases.add_video import add_video
from ..use_cases.get_videos import get_videos
from ..repositories.sqlite_repository import SQLiteRepository
from ..services.youtube_service import YouTubeService
from .. import redis_client

video_repository = SQLiteRepository()
youtube_service = YouTubeService(redis_client=redis_client)


def add_video_controller():
    data = request.get_json()
    url = data.get('url')
    result = add_video(url, video_repository, redis_client, youtube_service)
    return jsonify(result), 201 if 'error' not in result else 400


def get_videos_controller():
    videos = get_videos(video_repository)
    return jsonify(videos), 200
