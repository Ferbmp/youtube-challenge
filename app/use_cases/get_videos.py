from typing import List, Dict, Union
from app.entities.video import Video

def get_videos(video_repository, redis_repository) -> List[Dict[str, Union[str, int]]]:
  
    videos_from_db = video_repository.get_all()
    videos_dict = {video.id: video.to_dict() for video in videos_from_db}

    cached_videos = redis_repository.get_all()  
    for cached_video in cached_videos:
        if cached_video['id'] not in videos_dict:
            video = Video(
                id=cached_video['id'],
                url=cached_video['url'],
                title=cached_video['title'],
                thumbnail=cached_video['thumbnail']
            )
            video_repository.add(video)
            videos_dict[cached_video['id']] = cached_video

    return list(videos_dict.values())
