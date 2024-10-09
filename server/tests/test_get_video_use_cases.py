import pytest
from unittest.mock import Mock
from app import create_app, db
from app.repositories.implementations.sqlite_repository import SQLiteRepository
from app.use_cases.get_videos import get_videos
from app.entities.video import Video
import redis
from app.repositories.implementations.redis_repository import RedisRepository


@pytest.fixture
def redis_client():
    return redis.Redis(host='localhost', port=6379, db=1)

@pytest.fixture
def video_repository(app):
    with app.app_context():
        return SQLiteRepository()

@pytest.fixture
def redis_repository(redis_client, video_repository):
    return RedisRepository(redis_client, video_repository)

@pytest.fixture
def app():
    app = create_app(testing=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_videos.db'
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

def test_get_videos_use_case(video_repository, redis_repository):
    video1 = Video(id='F82uzV4PffM', url='https://example.com', title='Test Video 1', thumbnail='https://example.com/thumb1.jpg', description='Description 1')
    video2 = Video(id='XYZ123', url='https://example.com', title='Test Video 2', thumbnail='https://example.com/thumb2.jpg', description='Description 2')

    video_repository.add(video1)
    video_repository.add(video2)

   
    redis_repository.get_all_paginated = Mock(return_value=([  
        {
            'id': 'F82uzV4PffM',
            'url': 'https://example.com',
            'title': 'Test Video 1',
            'thumbnail': 'https://example.com/thumb1.jpg',
            'description': 'Description 1',
            'created_at': '2024-10-10T12:00:00'
        },
        {
            'id': 'XYZ123',
            'url': 'https://example.com',
            'title': 'Test Video 2',
            'thumbnail': 'https://example.com/thumb2.jpg',
            'description': 'Description 2',
            'created_at': '2024-10-11T12:00:00'
        }
    ], 2)) 
    result = get_videos(page=1, per_page=10, redis_repo=redis_repository, sqlite_repo=video_repository)


    assert 'videos' in result  
    assert isinstance(result['videos'], list)  
    assert len(result['videos']) == 2  
    assert result['page'] == 1
    assert result['per_page'] == 10
    assert result['total_videos'] == 2
    assert result['total_pages'] == 1
