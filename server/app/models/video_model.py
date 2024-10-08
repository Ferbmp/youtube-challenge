from typing import Dict
from .. import db

class VideoModel(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.String(11), primary_key=True)
    url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    thumbnail = db.Column(db.String(255), nullable=True)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.String(50), nullable=False)

    def to_dict(self) -> Dict[str, str]:
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'thumbnail': self.thumbnail,
            'description': self.description,
            'created_at': self.created_at
        }
