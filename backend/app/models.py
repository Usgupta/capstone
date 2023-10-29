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
    model = relationship("Model")
    confidence_level = Column(Float)

class Audio(Base):
    __tablename__ = "results"
