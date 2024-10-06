class Video:
    def __init__(self, url, title, thumbnail, id=None):  
        self.id = id
        self.url = url
        self.title = title
        self.thumbnail = thumbnail

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'title': self.title,
            'thumbnail': self.thumbnail
        }
