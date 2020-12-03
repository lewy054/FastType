from sqlalchemy.orm import relationship, backref
from base import Base


class User(Base):
    __table__ = Base.metadata.tables['users']
