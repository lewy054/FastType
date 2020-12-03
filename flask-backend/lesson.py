from sqlalchemy.orm import relationship, backref
from base import Base


class Lesson(Base):
    __table__ = Base.metadata.tables['lessons']
