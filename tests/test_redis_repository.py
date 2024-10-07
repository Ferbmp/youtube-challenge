import pytest
from app import create_app
from app.entities.video import Video
from unittest.mock import Mock
from app.repositories.redis_repository import RedisRepository
import redis
import json

@pytest.fixture
def redis_client():
    return redis.Redis(host='localhost', port=6379, db=1)

@pytest.fixture
def redis_repository(redis_client):
    return RedisRepository(redis_client)

@pytest.fixture
def mock_redis():
    redis_mock = Mock()
    redis_mock.get = Mock(return_value=json.dumps({
        "id": "F82uzV4PffM",
        "url": "https://example.com",
        "title": "Test Video",
        "thumbnail": "https://example.com/thumb.jpg"
    }))
    return redis_mock

@pytest.fixture
def app():
    app = create_app()
    yield app

def test_redis_repository_add_video(redis_repository, redis_client):
    video = Video(id='F82uzV4PffM', url='https://example.com', title='Test Title', thumbnail='https://example.com/thumb.jpg')
    
    redis_repository.add(video.to_dict())   
  
    cached_video = redis_client.get(video.id)
    assert cached_video is not None   
    assert cached_video.decode('utf-8') == '{"id": "F82uzV4PffM", "url": "https://example.com", "title": "Test Title", "thumbnail": "https://example.com/thumb.jpg"}'


def test_redis_repository_integration(mock_redis):
    video = Video(id='F82uzV4PffM', url='https://example.com', title='Test Video', thumbnail='https://example.com/thumb.jpg')

    redis_repository = RedisRepository(mock_redis)
    redis_repository.add(video.to_dict())   

    cached_video = mock_redis.get(video.id)
    assert cached_video is not None
    cached_video_data = json.loads(cached_video)
    assert cached_video_data == video.to_dict()