 
import re
from typing import Optional

def extract_video_id(url: str) -> Optional[str]:
    match = re.search(r"v=([a-zA-Z0-9_-]{11})", url)
    if match:
        return match.group(1)
    return None
