import math
from typing import List, Dict, Set, Any, TypedDict
from app.repositories.implementations.redis_repository import RedisRepository
from app.repositories.implementations.sqlite_repository import SQLiteRepository
from app.entities.video import Video  

class VideoDict(TypedDict):
    id: str
    url: str
    title: str
    thumbnail: str
    description: str
    created_at: str

def add_videos_to_db(videos: List[VideoDict], sqlite_repo: SQLiteRepository):
 
    for video_data in videos:
        try:
            video = Video(
                id=video_data['id'],
                url=video_data['url'],
                title=video_data['title'],
                thumbnail=video_data.get('thumbnail'),
                description=video_data.get('description'),
                created_at=video_data['created_at']
            )
            sqlite_repo.add(video)
        except Exception as e:
            print(f"Erro ao re-inserir vídeo no banco de dados: {e}")

def get_videos(
    page: int,
    per_page: int,
    redis_repo: RedisRepository,
    sqlite_repo: SQLiteRepository
) -> Dict[str, Any]:

    cached_videos, _ = redis_repo.get_all_paginated(page, per_page)
    
    if not isinstance(cached_videos, list):
        cached_videos = []
    
    total_videos: int = sqlite_repo.count_videos()

    print(f"Vídeos no cache: {len(cached_videos)}")
    print(f"Total de vídeos no banco: {total_videos}")
    
   
    if total_videos == 0 and len(cached_videos) > 0:
        print("Banco de dados vazio, sincronizando com o cache.")
        add_videos_to_db(cached_videos, sqlite_repo)
        total_videos = sqlite_repo.count_videos()  

    missing_videos_count = per_page - len(cached_videos)

    if missing_videos_count > 0:
        cached_video_ids: Set[str] = {video['id'] for video in cached_videos}
        offset = (page - 1) * per_page + len(cached_videos)

        videos_from_db = sqlite_repo.get_videos_excluding_ids(
            exclude_ids=cached_video_ids,
            offset=offset,
            limit=missing_videos_count
        )


        videos_from_db_data = [
            {
                'id': video.id,
                'url': video.url,
                'title': video.title,
                'thumbnail': video.thumbnail,
                'description': video.description,
                'created_at': video.created_at
            }
            for video in videos_from_db
        ]

        for video_data in videos_from_db_data:
            try:
                redis_repo.add(video_data)
            except Exception as e:
                print(f"Erro ao adicionar vídeo ao cache: {e}")

    
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
