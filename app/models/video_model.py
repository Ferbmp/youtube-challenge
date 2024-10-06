from .. import db

class VideoModel(db.Model):
    __tablename__ = 'videos'
    id = db.Column(db.String(11), primary_key=True)   
    url = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    thumbnail = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'thumbnail': self.thumbnail
        }
