from .. import db
from ..entities.video import Video
from ..models.video_model import VideoModel
from .repository_interface import RepositoryInterface

class SQLiteRepository(RepositoryInterface):
    def add(self, video: Video):
        video_model = VideoModel(
            id=video.id,  
            url=video.url,
            title=video.title,
            thumbnail=video.thumbnail
        )
        db.session.add(video_model)
        db.session.commit()
        return video_model

    def get_all(self):
        video_models = VideoModel.query.all()
        return [Video(url=video.url, title=video.title, thumbnail=video.thumbnail, id=video.id) for video in video_models]
