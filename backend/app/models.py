from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)


class Model(Base):
    __tablename__ = "models"
    id = Column(Integer, primary_key=True, index = True)
    name = Column(String, unique= True, index =True)


class Result(Base):
    __tablename__ = "results"
    id = Column(Integer, primary_key=True, index = True)
    model = relationship("Model", back_populates = 'name')
    confidence_level = Column(Float)

class Audio(Base):
    __tablename__ = "Audio"
    id = Column(Integer, primary_key=True, index = True)
    format = Column(String)
    length = confidence_level = Column(Float)
    data = relationship("AudioData", back_populates = 'filename' )

class AudioData(Base):
    __tablename__ = "AudioData"
    id = Column(Integer, primary_key=True, index = True)
    filename = Column(String)

class Test(Base):
    __tablename__ = "Tests"
    id = Column(Integer, primary_key=True, index = True)
    user_id = relationship("User", back_populates = 'id')
