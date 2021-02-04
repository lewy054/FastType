from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, ForeignKey, String, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

engine = create_engine('sqlite:///./database.db', convert_unicode=True, echo=False, connect_args={'timeout': 15})
Base = declarative_base()
Base.metadata.reflect(engine)
Session = sessionmaker(bind=engine)


class UserAchievement(Base):
    __tablename__ = 'UserAchievement'
    __table_args__ = {'extend_existing': True}
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    achievement_id = Column(Integer, ForeignKey('achievement.id'), primary_key=True)
    achievements = relationship("Achievement", back_populates="users")
    users = relationship("User", back_populates="achievements")


class UserLesson(Base):
    __tablename__ = 'UserLesson'
    __table_args__ = {'extend_existing': True}
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    lesson_id = Column(Integer, ForeignKey('lesson.id'), primary_key=True)
    wpm = Column(Integer)  # extra_data
    time = Column(String(50))  # extra_data
    lessons = relationship("Lesson", back_populates="users")
    users = relationship("User", back_populates="lessons")


class User(Base):
    __tablename__ = 'user'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    lessons = relationship("UserLesson", back_populates="users")
    achievements = relationship("UserAchievement", back_populates="users")

class Achievement(Base):
    __tablename__ = 'achievement'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    achievement_id = Column(Integer)
    users = relationship("UserAchievement", back_populates="achievements")

class Lesson(Base):
    __tablename__ = 'lesson'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True)
    lesson_id = Column(Integer)
    users = relationship("UserLesson", back_populates="lessons")


Base.metadata.create_all(engine)