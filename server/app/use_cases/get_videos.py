from typing import List, Dict, Union
from app.entities.video import Video

def get_videos(video_repository, redis_repository, page: int = 1, per_page: int = 10):
    videos_from_db = video_repository.get_all_paginated(page, per_page)
    
    videos_dict = {video.id: video.to_dict() for video in videos_from_db}

    cached_videos = redis_repository.get_all()
    for cached_video in cached_videos:
        if cached_video['id'] not in videos_dict:
            video = Video(
                id=cached_video['id'],
                url=cached_video['url'],
                title=cached_video['title'],
                thumbnail=cached_video['thumbnail'],
                description=cached_video['description']
            )
            video_repository.add(video)
            videos_dict[cached_video['id']] = cached_video

    return {
        "videos": list(videos_dict.values()),
        "page": page,
        "per_page": per_page
    }
