from abc import ABC, abstractmethod
from typing import Optional, Dict

class RepositoryInterface(ABC):
    @abstractmethod
    def add(self, video: Dict[str, str]) -> None:
        pass

    @abstractmethod
    def get(self, video_id: str) -> Optional[Dict[str, str]]:
        pass


    @abstractmethod
    def delete(self, video_id: str) -> None:
        pass