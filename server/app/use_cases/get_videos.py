from typing import List, Dict, Optional, Union
from app.entities.video import Video
from app.repositories.sqlite_repository import SQLiteRepository
from app.repositories.redis_repository import RedisRepository


def get_videos(
    video_repository: SQLiteRepository, 
    redis_repository: RedisRepository, 
    page: Optional[int] = None, 
    per_page: Optional[int] = None
) -> Dict[str, Union[int, List[Dict[str, Union[str, int]]]]]:

    videos_from_db = video_repository.get_all()
    cached_videos = redis_repository.get_all()

    videos_dict = {video.id: video.to_dict() for video in videos_from_db}

    for cached_video in cached_videos:
        if isinstance(cached_video, dict) and 'id' in cached_video:
            if cached_video['id'] not in videos_dict:
                video = Video(
                    id=cached_video['id'],
                    url=cached_video['url'],
                    title=cached_video['title'],
                    thumbnail=cached_video['thumbnail'],
                    description=cached_video.get('description'),
                    created_at=cached_video.get('created_at')
                )
               
                video_repository.add(video)
                videos_dict[cached_video['id']] = cached_video

    
    all_videos = list(videos_dict.values())
   
    all_videos.sort(key=lambda x: x.get('created_at', ''), reverse=True)
   
    if page is not None and per_page is not None:
        start = (page - 1) * per_page
        end = start + per_page
        paginated_videos = all_videos[start:end]
        total_pages = (len(all_videos) + per_page - 1) // per_page

        return {
            "page": page,
            "per_page": per_page,
            "total_pages": total_pages,
            "total_videos": len(all_videos),
            "videos": paginated_videos
        }

    return {
        "total_videos": len(all_videos),
        "videos": all_videos
    }
