import os
from dotenv import load_dotenv
import requests
 
load_dotenv()

YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/videos'
 
def extract_video_id(url):
    return url.split('v=')[1]

def get_video_info(url):
    video_id = extract_video_id(url)
    if not video_id:
        return None

    response = requests.get(YOUTUBE_API_URL, params={
        'id': video_id,
        'key': YOUTUBE_API_KEY,
        'part': 'snippet'
    })
   
    if response.status_code == 200:
        data = response.json()
        if data['items']:
            video = data['items'][0]['snippet']
            return {
                'title': video['title'],
                'thumbnail': video['thumbnails']['high']['url']
            }
    return None