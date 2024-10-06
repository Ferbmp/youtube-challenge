class Video:
    def __init__(self, url, title, thumbnail):
        self.url = url
        self.title = title
        self.thumbnail = thumbnail

    def to_dict(self):
        return {
            'url': self.url,
            'title': self.title,
            'thumbnail': self.thumbnail
        }
