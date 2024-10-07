 
from app.entities.video import Video

def test_video_creation():
    video = Video(id='F82uzV4PffM', url='https://example.com', title='Test Title', thumbnail='https://example.com/thumb.jpg',description='')
    
    assert video.id == 'F82uzV4PffM'
    assert video.url == 'https://example.com'
    assert video.title == 'Test Title'
    assert video.thumbnail == 'https://example.com/thumb.jpg'
    assert video.description == ''
