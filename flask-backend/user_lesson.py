from sqlalchemy.orm import relationship, backref
from base import Base


class UserLesson(Base):
    __table__ = Base.metadata.tables['user_lesson']
