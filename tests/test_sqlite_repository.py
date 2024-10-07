import pytest
from app import create_app, db
from app.entities.video import Video
from app.repositories.sqlite_repository import SQLiteRepository
from app.models.video_model import VideoModel
 
@pytest.fixture
def app():
    app = create_app(testing=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_videos.db'  
    with app.app_context():
        db.create_all()   
        yield app
        db.drop_all()  
      

def test_repository_add_video(app):
    repository = SQLiteRepository()

    with app.app_context():
        video = Video(id='F82uzV4PffM', url='https://example.com', title='Test Title', thumbnail='https://example.com/thumb.jpg')
        saved_video = repository.add(video)
        
        assert saved_video.id == 'F82uzV4PffM'   
        assert VideoModel.query.count() == 1  

def test_repository_get_all_videos(app):
    repository = SQLiteRepository()

    with app.app_context():
        video1 = Video(id='F82uzV4PffM', url='https://example.com', title='Test Title 1', thumbnail='https://example.com/thumb1.jpg')
        video2 = Video(id='XYZ123', url='https://example.com', title='Test Title 2', thumbnail='https://example.com/thumb2.jpg')
        
        repository.add(video1)
        repository.add(video2)

        videos = repository.get_all()
        assert len(videos) == 2  
