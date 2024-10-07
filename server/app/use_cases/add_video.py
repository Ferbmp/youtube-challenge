from typing import Tuple, Dict, Union
from ..entities.video import Video
from ..repositories.sqlite_repository import SQLiteRepository
from ..repositories.redis_repository import RedisRepository
from ..services.youtube_service import YouTubeService
from app.utils.utils import extract_video_id

def add_video(
    url: str, 
    video_repository: SQLiteRepository, 
    youtube_service: YouTubeService, 
    redis_repository: RedisRepository
) -> Union[Dict[str, Union[str, int]], Tuple[Dict[str, str], int]]:

    video_id = extract_video_id(url)
    if not video_id:
        return {"error": "Invalid YouTube URL."} 
 
    cached_video = redis_repository.get(video_id)
    if cached_video:
        return {"message": "Video already exists."} 

    existing_video = video_repository.get(video_id)
    if existing_video:
        return {"message": "Video already exists."} 

    video_info = youtube_service.get_video_info(url)
    if video_info is None:
        return {"error": "Invalid YouTube URL or API response"}, 400

    video = Video(url=url, title=video_info['title'], thumbnail=video_info['thumbnail'], id=video_info['id'], description=video_info['description'])
    saved_video = video_repository.add(video)

    redis_repository.add(video_info)

    return saved_video.to_dict() if hasattr(saved_video, 'to_dict') else video_info