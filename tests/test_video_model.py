import pytest
from app import create_app, db
from app.models.video_model import VideoModel
 

@pytest.fixture
def app():
    app = create_app(testing=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_videos.db' 
   
    with app.app_context():
        db.create_all()   
        yield app
        db.drop_all()   
 

def test_video_model_creation(app):
    with app.app_context():
        video = VideoModel(id='F82uzV4PffM', url='https://example.com', title='Test Video', thumbnail='https://example.com/thumb.jpg')
        db.session.add(video)
        db.session.commit()

        assert video in db.session   
        assert video.id == 'F82uzV4PffM'   

def test_video_model_retrieval(app):
    with app.app_context():
        video = VideoModel(id='F82uzV4PffM', url='https://example.com', title='Test Video', thumbnail='https://example.com/thumb.jpg')
        db.session.add(video)
        db.session.commit()
        retrieved_video = db.session.get(VideoModel, 'F82uzV4PffM')

        assert retrieved_video is not None  
        assert retrieved_video.title == 'Test Video'   
