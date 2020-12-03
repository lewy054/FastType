from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine

engine = create_engine('sqlite:///./database.db', convert_unicode=True, echo=False)
Base = declarative_base()
Base.metadata.reflect(engine)