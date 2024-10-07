import json
from .repository_interface import RepositoryInterface
from typing import Optional, Dict,List, Tuple

class RedisRepository(RepositoryInterface):
    def __init__(self, redis_client):
        self.redis_client = redis_client

    def add(self, video: dict) -> None:
        self.redis_client.set(video['id'], json.dumps(video))
    def get(self, video_id: str) -> Optional[bytes]:
        return self.redis_client.get(video_id)

    def get_all(self) -> List[Dict[str, str]]:
        keys = self.redis_client.keys()
        videos = []
        for key in keys:
            video_data = self.redis_client.get(key)
            if video_data:
                videos.append(json.loads(video_data))
        return videos
    
    def delete(self, video_id: str) -> None:
        self.redis_client.delete(video_id)    

    def get_all_paginated(self, page: int, per_page: int) -> Tuple[List[Dict[str, str]], int]:
        all_videos = self.get_all()
        total_videos = len(all_videos)
        start = (page - 1) * per_page
        end = start + per_page
        paginated_videos = all_videos[start:end]
        return paginated_videos, total_videos        
    