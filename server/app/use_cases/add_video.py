from typing import Tuple, Dict, Union
from ..entities.video import Video
from ..repositories.implementations.sqlite_repository import SQLiteRepository
from ..repositories.implementations.redis_repository import RedisRepository
from ..repositories.implementations.youtube_repository import YouTubeRepository
 
from app.utils.utils import extract_video_id
from datetime import datetime, timezone

def add_video(
    url: str, 
    video_repository: SQLiteRepository, 
    youtube_repository: YouTubeRepository, 
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

    video_info = youtube_repository.get_video_info(url)
    if video_info is None:
        return {"error": "Invalid YouTube URL or API response"}, 400
 
    created_at = datetime.now(timezone.utc).isoformat()

    video = Video(
        url=url,
        title=video_info['title'],
        thumbnail=video_info['thumbnail'],
        description=video_info['description'],
        id=video_info['id'],
        created_at=created_at
    )
    saved_video = video_repository.add(video)

    video_info['created_at'] = created_at
    redis_repository.add(video_info)

    return saved_video.to_dict() if hasattr(saved_video, 'to_dict') else video_info