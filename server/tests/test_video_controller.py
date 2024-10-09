import pytest
from app import create_app, db
from unittest.mock import Mock
import redis



@pytest.fixture
def client():
    app = create_app(testing=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_videos.db'
    with app.app_context():
        db.create_all()
        redis_client = redis.Redis(host='localhost', port=6379, db=1)
        redis_client.flushdb()
        yield app.test_client()
        db.drop_all()
        redis_client.flushdb()

@pytest.fixture
def mock_redis_repository():
    return Mock()

@pytest.fixture
def mock_video_repository():
    video_repo_mock = Mock()
    
    video_repo_mock.count_videos.return_value = 2

    video_repo_mock.get_videos_excluding_ids.return_value = [
        Mock(id='video1', url='https://example.com/video1', title='Test Video 1', 
             thumbnail='https://example.com/thumb1.jpg', description='Sample description 1', 
             created_at='2024-10-10T12:00:00'),
        Mock(id='video2', url='https://example.com/video2', title='Test Video 2', 
             thumbnail='https://example.com/thumb2.jpg', description='Sample description 2', 
             created_at='2024-10-11T12:00:00')
    ]
    
    return video_repo_mock

@pytest.fixture
def mock_youtube_repository():
    youtube_repo_mock = Mock()
    youtube_repo_mock.get_video_info.return_value = {
        'id': 'unique_video_id',
        'title': 'Test Video',
        'thumbnail': 'https://example.com/thumb.jpg',
        'description': 'Sample description'
    }
    return youtube_repo_mock

def test_add_video_controller(client, mock_redis_repository, mock_youtube_repository):
    video_url = 'https://www.youtube.com/watch?v=eRP-xuMDKfE'


    mock_redis_repository.get.return_value = None
    mock_youtube_repository.get_video_info.return_value = {
        'id': 'unique_video_id',
        'title': 'Test Video',
        'thumbnail': 'https://example.com/thumb.jpg',
        'description': 'Sample description'
    }

    response = client.post('/videos', json={'url': video_url})
    assert response.status_code == 201
    