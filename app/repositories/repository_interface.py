from abc import ABC, abstractmethod

class RepositoryInterface(ABC):
    @abstractmethod
    def add(self, video):
        pass

    @abstractmethod
    def get_all(self):
        pass
