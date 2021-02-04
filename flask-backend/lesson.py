from sqlalchemy import Column, Integer, ForeignKey, String, Table
from sqlalchemy.orm import relationship
from base import Base
from user_lesson import UserLesson


class Lesson(Base):
    __tablename__ = 'lesson'
    id = Column(Integer, primary_key=True)
    lesson_id = Column(Integer)
    status = Column(Integer)
    user = relationship("UserLesson", back_populates="lesson")
