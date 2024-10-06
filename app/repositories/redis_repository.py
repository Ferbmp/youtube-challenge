import json
from .repository_interface import RepositoryInterface

class RedisRepository(RepositoryInterface):
    def __init__(self, redis_client):
        self.redis_client = redis_client

    def add(self, video):
        self.redis_client.set(video.id, json.dumps(video.to_dict()), ex=3600)

   
