from ..repositories.sqlite_repository import SQLiteRepository
from ..repositories.redis_repository import RedisRepository
from typing import Dict

def delete_video(video_id: str, video_repository: SQLiteRepository, redis_repository: RedisRepository) -> Dict[str, str]:
    video_deleted = False

    if redis_repository.get(video_id):
        redis_repository.delete(video_id)
        video_deleted = True
 
    if video_repository.delete(video_id):
        video_deleted = True

    if video_deleted:
        return {"message": "Video deleted successfully."}
    
    return {"error": "Video not found."}
