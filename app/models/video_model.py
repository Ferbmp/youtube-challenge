from typing import Dict
from .. import db

class VideoModel(db.Model):
    __tablename__ = 'videos'
    id: str = db.Column(db.String(11), primary_key=True)   
    url: str = db.Column(db.String(255), nullable=False)
    title: str = db.Column(db.String(255), nullable=False)
    thumbnail: str = db.Column(db.String(255), nullable=False)

    def to_dict(self) -> Dict[str, str]:
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'thumbnail': self.thumbnail
        }