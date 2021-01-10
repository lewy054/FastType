from sqlalchemy.orm import relationship, backref
from base import Base


class Achievement(Base):
    __table__ = Base.metadata.tables['achievement']
