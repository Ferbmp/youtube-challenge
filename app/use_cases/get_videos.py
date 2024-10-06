def get_videos(video_repository):
 
    videos = video_repository.get_all()
    
    return [video.to_dict() for video in videos]
