import pytest
from app import create_app, db
from app.entities.video import Video
from app.repositories.implementations.sqlite_repository import SQLiteRepository
from app.models.video_model import VideoModel

@pytest.fixture
def app():
    app = create_app(testing=True)
    with app.app_context():
        db.create_all()
        yield app
        db.drop_all()

@pytest.fixture
def repository():
    return SQLiteRepository()

@pytest.fixture
def sample_video_data():
    return Video(
        id='F82uzV4PffM',
        url='https://example.com',
        title='Test Title',
        thumbnail='https://example.com/thumb.jpg',
        description='Sample description',
        created_at='2024-10-10T12:00:00'
    )

def test_repository_add_video(app, repository, sample_video_data):
    with app.app_context():
        saved_video = repository.add(sample_video_data)

        assert saved_video.id == sample_video_data.id
        assert VideoModel.query.count() == 1

def test_repository_add_existing_video(app, repository, sample_video_data):
    with app.app_context():
        repository.add(sample_video_data)

        result = repository.add(sample_video_data)

        assert result['message'] == "Video already exists."
        assert VideoModel.query.count() == 1 

def test_repository_get_video(app, repository, sample_video_data):
    with app.app_context():
        repository.add(sample_video_data)

        video = repository.get(sample_video_data.id)

        assert video is not None
        assert video.id == sample_video_data.id
        assert video.title == sample_video_data.title

def test_repository_get_videos_excluding_ids(app, repository):
    with app.app_context():
        video1 = Video(id='F82uzV4PffM', url='https://example.com', title='Test Title 1', thumbnail='https://example.com/thumb1.jpg', description='', created_at='2024-10-10T12:00:00')
        video2 = Video(id='XYZ123', url='https://example.com', title='Test Title 2', thumbnail='https://example.com/thumb2.jpg', description='', created_at='2024-10-11T12:00:00')

        repository.add(video1)
        repository.add(video2)

        videos = repository.get_videos_excluding_ids(exclude_ids={'F82uzV4PffM'}, offset=0, limit=10)
        assert len(videos) == 1
        assert videos[0].id == 'XYZ123'

def test_repository_count_videos(app, repository):
    with app.app_context():
        video1 = Video(id='F82uzV4PffM', url='https://example.com', title='Test Title 1', thumbnail='https://example.com/thumb1.jpg', description='', created_at='2024-10-10T12:00:00')
        video2 = Video(id='XYZ123', url='https://example.com', title='Test Title 2', thumbnail='https://example.com/thumb2.jpg', description='', created_at='2024-10-11T12:00:00')

        repository.add(video1)
        repository.add(video2)

        assert repository.count_videos() == 2

def test_repository_delete_video(app, repository, sample_video_data):
    with app.app_context():
        repository.add(sample_video_data)

        result = repository.delete(sample_video_data.id)
        assert result is True

        video = repository.get(sample_video_data.id)
        assert video is None
        assert VideoModel.query.count() == 0
