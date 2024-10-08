from typing import Optional
from urllib.parse import urlparse, parse_qs

def extract_video_id(url: str) -> Optional[str]:
    parsed_url = urlparse(url)
    hostname = parsed_url.hostname

    if hostname in ['www.youtube.com', 'youtube.com']:

        query = parse_qs(parsed_url.query)
        video_ids = query.get('v')
        if video_ids and len(video_ids[0]) == 11:
            return video_ids[0]
    elif hostname == 'youtu.be':
     
        path = parsed_url.path.strip('/')
        if len(path) == 11:
            return path
    return None