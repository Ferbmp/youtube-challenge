import pytest
from unittest.mock import Mock
from app.repositories.implementations.redis_repository import RedisRepository
from app.entities.video import Video
import json
import redis

@pytest.fixture
def redis_client():
    return redis.Redis(host='localhost', port=6379, db=1)

@pytest.fixture
def redis_repository(redis_client):
    return RedisRepository(redis_client, db_repository=None)

@pytest.fixture
def mock_redis():
    redis_mock = Mock()
    redis_mock.get = Mock(return_value=json.dumps({
        "id": "F82uzV4PffM",
        "url": "https://example.com",
        "title": "Test Video",
        "thumbnail": "https://example.com/thumb.jpg",
        "description": "Sample description"
    }))
    return redis_mock

@pytest.fixture
def sample_video():
    return Video(
        id='F82uzV4PffM',
        url='https://example.com',
        title='Test Title',
        thumbnail='https://example.com/thumb.jpg',
        description='Sample description'
    )

def test_redis_repository_add_video(redis_repository, redis_client, sample_video):
    video_data = sample_video.to_dict()
    
    redis_repository.add(video_data)
    
    cached_video = redis_client.get(video_data['id'])
    assert cached_video is not None
    
    expected_data = json.dumps(video_data)
    assert cached_video.decode('utf-8') == expected_data

def test_redis_repository_get_video(redis_repository, sample_video):
    video_data = sample_video.to_dict()
    
 
    redis_repository.add(video_data)
    
    retrieved_video = redis_repository.get(video_data['id'])
    assert retrieved_video is not None
    assert retrieved_video == video_data

def test_redis_repository_delete_video(redis_repository, redis_client, sample_video):
    video_data = sample_video.to_dict()
    
    redis_repository.add(video_data)
    
    redis_repository.delete(video_data['id'])
    
    cached_video = redis_client.get(video_data['id'])
    assert cached_video is None
 

def test_redis_repository_integration(mock_redis, sample_video):
    video_data = sample_video.to_dict()
    
    mock_redis.get = Mock(return_value=json.dumps(video_data))
    
    redis_repository = RedisRepository(mock_redis, db_repository=None)
    redis_repository.add(video_data)
    
    cached_video = mock_redis.get(video_data['id'])
    assert cached_video is not None
    
    cached_video_data = json.loads(cached_video)
    assert cached_video_data == video_data
