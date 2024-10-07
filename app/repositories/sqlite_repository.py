from typing import Optional, List
from .. import db
from ..entities.video import Video
from ..models.video_model import VideoModel
from .repository_interface import RepositoryInterface

class SQLiteRepository(RepositoryInterface):
    def add(self, video: Video) -> VideoModel:
        existing_video = db.session.get(VideoModel, video.id)
        if existing_video:
            return {
                "message": "Video already exists."
            }
        
        video_model = VideoModel(
            id=video.id,
            url=video.url,
            title=video.title,
            thumbnail=video.thumbnail
        )
        db.session.add(video_model)
        db.session.commit()
        return video_model

    def get(self, video_id: str) -> Optional[Video]:
        video_model = db.session.get(VideoModel, video_id)
        if video_model:
            return Video(
                id=video_model.id,
                url=video_model.url,
                title=video_model.title,
                thumbnail=video_model.thumbnail
            )
        return None

    def get_all(self) -> List[Video]:
        video_models = VideoModel.query.all()
        return [
            Video(id=video.id, url=video.url, title=video.title, thumbnail=video.thumbnail)
            for video in video_models
        ]
