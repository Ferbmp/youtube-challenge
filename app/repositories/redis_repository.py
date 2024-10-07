import json
from .repository_interface import RepositoryInterface
from typing import Optional, Dict,List
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