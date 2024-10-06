import os
import requests
import json
import re
class YouTubeService:
  def __init__(self, redis_client):
      self.api_key = os.getenv('YOUTUBE_API_KEY')   
      self.redis_client = redis_client
      self.base_url = "https://www.googleapis.com/youtube/v3/videos"


  def extract_video_id(self, url):
      match = re.search(r"v=([a-zA-Z0-9_-]{11})", url)
      if match:
          return match.group(1)
      return None


  def get_video_info(self, url):
      video_id = self.extract_video_id(url)
      if not video_id:
          return None

    
      cached_video = self.redis_client.get(video_id)
      if cached_video:
          return json.loads(cached_video)

       
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
                  'thumbnail': video['thumbnails']['high']['url']
              }
           
              self.redis_client.setex(video_id, 3600, json.dumps(video_info))
              return video_info
      return None        
        
      
