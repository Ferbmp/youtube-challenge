from typing import Optional, TypedDict

class VideoInfo(TypedDict, total=False):
    id: str
    title: str
    description: str
    thumbnail_url: str
    url: str 

class ExternalVideoInterface:
    def get_video_info(self, url: str) -> Optional[VideoInfo]:
        raise NotImplementedError
