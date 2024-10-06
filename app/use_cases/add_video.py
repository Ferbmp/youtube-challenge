from ..entities.video import Video

def add_video(url, video_repository, redis_client, youtube_service):
    video_info = youtube_service.get_video_info(url)
    if video_info is None:
        return {"error": "Invalid YouTube URL or API response"}, 400

    video = Video(id=video_info['id'], url=url, title=video_info['title'], thumbnail=video_info['thumbnail'])
 
    saved_video = video_repository.add(video)

    return saved_video.to_dict()   

