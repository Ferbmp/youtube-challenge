from abc import ABC, abstractmethod
from typing import Optional, List, Dict

class RepositoryInterface(ABC):
    @abstractmethod
    def add(self, video: Dict[str, str]) -> None:
        pass

    @abstractmethod
    def get(self, video_id: str) -> Optional[Dict[str, str]]:
        pass

    @abstractmethod
    def get_all(self) -> List[Dict[str, str]]:
        pass
