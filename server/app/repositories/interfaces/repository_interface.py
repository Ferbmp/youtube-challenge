from abc import ABC, abstractmethod
from typing import Optional, List, Dict, Tuple

class RepositoryInterface(ABC):
    @abstractmethod
    def add(self, video: Dict[str, str]) -> None:
        pass

    @abstractmethod
    def get(self, video_id: str) -> Optional[Dict[str, str]]:
        pass

    @abstractmethod
    def get_all_paginated(self, page: int, per_page: int) -> Tuple[List[Dict[str, str]], int]:
        pass

    @abstractmethod
    def delete(self, video_id: str) -> None:
        pass