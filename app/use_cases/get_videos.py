from typing import List, Dict, Union

def get_videos(video_repository) -> List[Dict[str, Union[str, int]]]:
    videos = video_repository.get_all()
    return [video.to_dict() for video in videos]