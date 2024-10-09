from typing import Optional, List, Tuple, Set
from app import db
from ...entities.video import Video
from ...models.video_model import VideoModel
from ..interfaces.repository_interface import RepositoryInterface

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
            thumbnail=video.thumbnail,
            description=video.description,
            created_at=video.created_at
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
                thumbnail=video_model.thumbnail,
                description=video_model.description,   
                created_at=video_model.created_at 
            )
        return None

    def get_all_paginated(self, page: int, per_page: int) -> Tuple[List[Video], int]:
        paginated_query = VideoModel.query.order_by(VideoModel.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        video_models = paginated_query.items
        total_videos = paginated_query.total

        paginated_videos = [
            Video(
                id=video.id,
                url=video.url,
                title=video.title,
                thumbnail=video.thumbnail,
                description=video.description,
                created_at=video.created_at
            )
            for video in video_models
        ]

        return paginated_videos, total_videos

    def get_videos_excluding_ids(self, exclude_ids: Set[str], offset: int, limit: int) -> List[Video]:
        query = VideoModel.query.filter(~VideoModel.id.in_(exclude_ids)).order_by(VideoModel.created_at.desc())
        video_models = query.offset(offset).limit(limit).all()

        videos = [
            Video(
                id=video.id,
                url=video.url,
                title=video.title,
                thumbnail=video.thumbnail,
                description=video.description,
                created_at=video.created_at
            )
            for video in video_models
        ]

        return videos

    def count_videos(self) -> int:
        return VideoModel.query.count()

    def delete(self, video_id: str) -> bool:
        video_model = db.session.get(VideoModel, video_id)
        if video_model:
            db.session.delete(video_model)
            db.session.commit()
            return True
        return False
