import pytest
from app import create_app, db
from unittest.mock import Mock
import redis



def mock_youtube_service():
    youtube_service_mock = Mock()
    youtube_service_mock.get_video_info.return_value = {
        'id': 'unique_video_id',
        'title': 'Test Video',
        'thumbnail': 'https://example.com/thumb.jpg'
    }
    return youtube_service_mock

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

def test_add_video_controller(client):
 
    video_url = 'https://www.youtube.com/watch?v=eRP-xuMDKfE'

    response = client.post('/videos', json={'url': video_url})
    assert response.status_code == 201
 
    response = client.post('/videos', json={'url': video_url})
    assert response.status_code == 409
    data = response.get_json()
    assert data['message'] == "Video already exists."