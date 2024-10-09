import json
from ..interfaces.repository_interface import RepositoryInterface
from typing import Optional, Dict, List, Tuple
from datetime import datetime, timezone
from ...entities.video import Video

class RedisRepository(RepositoryInterface):
    def __init__(self, redis_client, db_repository):
        self.redis_client = redis_client
        self.db_repository = db_repository  

    def add(self, video: dict, ttl: int = 600) -> None:
        video['created_at'] = video.get('created_at') or datetime.now(timezone.utc).isoformat()
        self.redis_client.set(video['id'], json.dumps(video), ex=ttl)
        created_at_timestamp = datetime.fromisoformat(video['created_at']).timestamp()
        self.redis_client.zadd('videos_sorted', {video['id']: created_at_timestamp})

    def get(self, video_id: str) -> Optional[dict]:
        video_data = self.redis_client.get(video_id)
        if video_data:
            return json.loads(video_data)
        return None

    def delete(self, video_id: str) -> None:
        self.redis_client.delete(video_id)
        self.redis_client.zrem('videos_sorted', video_id)   

    def get_all_paginated(self, page: int, per_page: int) -> Tuple[List[Dict[str, str]], int]:
        self._cleanup_expired_video_ids()

        total_videos = self.redis_client.zcard('videos_sorted')

        if total_videos == 0:
            return [], 0

        start = (page - 1) * per_page
        end = start + per_page - 1  

   
        video_ids = self.redis_client.zrevrange('videos_sorted', start, end)

        paginated_videos = []
        for video_id in video_ids:
            video_data = self.redis_client.get(video_id)
            if video_data:
                video = json.loads(video_data)
                paginated_videos.append(video)
            else:
                self.redis_client.zrem('videos_sorted', video_id)

        return paginated_videos 

    def _cleanup_expired_video_ids(self):
        video_ids = self.redis_client.zrange('videos_sorted', 0, -1)
        for video_id in video_ids:
            if not self.redis_client.exists(video_id):
                self.redis_client.zrem('videos_sorted', video_id)
