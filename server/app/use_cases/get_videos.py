import math
from typing import List, Dict, Set, Any
from app.repositories.implementations.redis_repository import RedisRepository
from app.repositories.implementations.sqlite_repository import SQLiteRepository

def get_videos(
    page: int,
    per_page: int,
    redis_repo: RedisRepository,
    sqlite_repo: SQLiteRepository
) -> Dict[str, Any]:
    cached_videos = redis_repo.get_all_paginated(page, per_page)
    cached_videos: List[Dict[str, Any]]  
    
    total_videos: int = sqlite_repo.count_videos()

    missing_videos_count = per_page - len(cached_videos)

    if missing_videos_count > 0:
        cached_video_ids: Set[str] = {video['id'] for video in cached_videos}

        offset = (page - 1) * per_page + len(cached_videos)

        videos_from_db = sqlite_repo.get_videos_excluding_ids(
            exclude_ids=cached_video_ids,
            offset=offset,
            limit=missing_videos_count
        )

        videos_from_db_data = []
        for video in videos_from_db:
            video_data = {
                'id': video.id,
                'url': video.url,
                'title': video.title,
                'thumbnail': video.thumbnail,
                'description': video.description,
                'created_at': video.created_at 
            }
            videos_from_db_data.append(video_data)

            redis_repo.add(video_data)


        videos_list = cached_videos + videos_from_db_data

        videos_list.sort(key=lambda x: x['created_at'], reverse=True)
    else:
        videos_list = cached_videos


    total_pages = math.ceil(total_videos / per_page) if total_videos else 0

    return {
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages,
        "total_videos": total_videos,
        "videos": videos_list
    }
