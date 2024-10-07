import json
from .repository_interface import RepositoryInterface

class RedisRepository(RepositoryInterface):
    def __init__(self, redis_client):
        self.redis_client = redis_client

    def add(self, video):
        self.redis_client.set(video.id, json.dumps(video.to_dict()))   

    def get_all(self):
      
        keys = self.redis_client.keys()   
        videos = []
        for key in keys:
            video_data = self.redis_client.get(key)
            if video_data:
                videos.append(json.loads(video_data))
        return videos
