import os
import requests
from typing import Optional, Dict
from app.utils.utils import extract_video_id
class YouTubeService:
    def __init__(self) -> None:
        self.api_key = os.getenv('YOUTUBE_API_KEY')
        self.base_url = "https://www.googleapis.com/youtube/v3/videos"

    def get_video_info(self, url: str) -> Optional[Dict[str, str]]:
        video_id = extract_video_id(url)
        if not video_id:
            return None

        response = requests.get(self.base_url, params={
            'id': video_id,
            'key': self.api_key,
            'part': 'snippet'
        })

        if response.status_code == 200:
            data = response.json()
         
            if data['items']:
                video = data['items'][0]['snippet']
                video_info = {
                    'id': video_id,
                    'title': video['title'],
                    'thumbnail': video['thumbnails']['high']['url'], 
                    'description': video['description'],
                    'url': url, 
                }
                return video_info
        return None
