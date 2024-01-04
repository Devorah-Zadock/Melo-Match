from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm.util import identity_key

Base = declarative_base()
class Song(Base):
    __tablename__ = 'Song'
    song_id = Column(Integer, primary_key=True)
    song_name = Column(String(50))
    artist_name = Column(String(50))
    album_name = Column(String(50))
    genre = Column(String(50))
    duration = Column(Float)
    year_of_publication = Column(Integer)

    def __init__(self, song_name, artist_name, album_name, genre, duration, year_of_publication):
        self.song_name = song_name
        self.artist_name = artist_name
        self.album_name = album_name
        self.genre = genre
        self.duration = duration
        self.year_of_publication = year_of_publication
        pass
