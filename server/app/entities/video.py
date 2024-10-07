class Video:
    def __init__(self, url: str, title: str, thumbnail: str, description, id: str = None):  
        self.id = id
        self.url = url
        self.title = title
        self.thumbnail = thumbnail
        self.description= description


    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'thumbnail': self.thumbnail,
            'description': self.description
        }
