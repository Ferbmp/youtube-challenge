import pytest
from unittest.mock import Mock
from app import create_app, db
from app.repositories.sqlite_repository import SQLiteRepository
from app.use_cases.add_video import add_video
from app.use_cases.get_videos import get_videos
from app.entities.video import Video
from app.models.video_model import VideoModel
import redis
from app.repositories.redis_repository import RedisRepository


@pytest.fixture
def redis_client():
    return redis.Redis(host='localhost', port=6379, db=1)

@pytest.fixture
def redis_repository(redis_client):
    return RedisRepository(redis_client)

 
@pytest.fixture
def app():
    app = create_app(testing=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_videos.db'   
    with app.app_context():
        db.create_all()  
        yield app
        db.drop_all()  

@pytest.fixture
def repository(app):
    return SQLiteRepository()

@pytest.fixture
def youtube_service(mocker):
    mock_service = Mock()
    mock_service.get_video_info.return_value = {
        'id': 'F82uzV4PffM',
        'title': 'Test Video',
        'thumbnail': 'https://example.com/thumb.jpg'
    }
    return mock_service

def test_add_video_use_case(repository, youtube_service, redis_repository):
    video_data = {
        'url': 'https://www.youtube.com/watch?v=F72uzV4PffM'
    }
    result = add_video(video_data['url'], repository, youtube_service, redis_repository)

    assert result['title'] == 'Test Video'
    assert VideoModel.query.count() == 1 

def test_get_videos_use_case(repository):
    video1 = Video(id='F82uzV4PffM', url='https://example.com', title='Test Video 1', thumbnail='https://example.com/thumb1.jpg')
    video2 = Video(id='XYZ123', url='https://example.com', title='Test Video 2', thumbnail='https://example.com/thumb2.jpg')
    
    repository.add(video1)
    repository.add(video2)

    videos = get_videos(repository)
    assert len(videos) == 2   
