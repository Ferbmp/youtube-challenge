import pytest
from app import create_app, db
from app.models.video_model import VideoModel
from datetime import datetime

@pytest.fixture
def app():
    app = create_app(testing=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_videos.db' 

    with app.app_context():
        db.create_all()   
        yield app
        db.drop_all()   

@pytest.fixture
def sample_video_data():
    return {
        'id': 'F82uzV4PffM',
        'url': 'https://example.com',
        'title': 'Test Video',
        'thumbnail': 'https://example.com/thumb.jpg',
        'description': 'Sample description',
        'created_at': datetime.utcnow().isoformat()
    }

def test_video_model_creation(app, sample_video_data):
    with app.app_context():
        video = VideoModel(**sample_video_data)
        db.session.add(video)
        db.session.commit()

        assert video in db.session   
        assert video.id == sample_video_data['id']
        assert video.url == sample_video_data['url']
        assert video.title == sample_video_data['title']
        assert video.thumbnail == sample_video_data['thumbnail']
        assert video.description == sample_video_data['description']

def test_video_model_retrieval(app, sample_video_data):
    with app.app_context():
        video = VideoModel(**sample_video_data)
        db.session.add(video)
        db.session.commit()

        retrieved_video = db.session.get(VideoModel, sample_video_data['id'])
        assert retrieved_video is not None  
        assert retrieved_video.id == sample_video_data['id']
        assert retrieved_video.title == sample_video_data['title']

def test_video_model_to_dict(app, sample_video_data):
    with app.app_context():
        video = VideoModel(**sample_video_data)
        db.session.add(video)
        db.session.commit()

        video_dict = video.to_dict()
        assert video_dict == sample_video_data
