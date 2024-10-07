import pytest
from app import create_app, db
from flask import json
 

@pytest.fixture
def client():
    app = create_app(testing=True)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test_videos.db'  
    with app.app_context():
        db.create_all()   
        yield app.test_client()
        db.drop_all()   
          
    
def test_add_video_controller(client):
    response = client.post('/videos', json={'url': 'https://www.youtube.com/watch?v=F82uzV4PffM'})
    assert response.status_code == 201   

    data = json.loads(response.data)
    assert data['url'] == 'https://www.youtube.com/watch?v=F82uzV4PffM'
