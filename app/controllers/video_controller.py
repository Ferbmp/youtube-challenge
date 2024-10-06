from ..models.video import Video
from ..services.youtube_service import get_video_info

videos_db = []   

def add_video(url):
    video_info = get_video_info(url)
    if video_info is None:
        return {"error": "Invalid YouTube URL or API response"}, 400

    video = Video(url=url, title=video_info['title'], thumbnail=video_info['thumbnail'])
    videos_db.append(video.to_dict())
    return video.to_dict()


def get_videos():
    return videos_db