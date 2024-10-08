from datetime import datetime, timezone

class Video:
    def __init__(self, url: str, title: str, thumbnail: str, description: str, id: str = None, created_at: str = None):  
        self.id = id
        self.url = url
        self.title = title
        self.thumbnail = thumbnail
        self.description = description
        self.created_at = created_at or datetime.now(timezone.utc).isoformat()

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'thumbnail': self.thumbnail,
            'description': self.description,
            'created_at': self.created_at
        }
