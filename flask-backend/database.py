import sqlite3
from passlib.hash import pbkdf2_sha256
from flask import Response
import json
from sqlalchemy import create_engine
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import scoped_session, sessionmaker, Query
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from user import User
from flask import jsonify
from lesson import Lesson
import os.path
from base import Base
from base import engine
from alchemyEncoder import AlchemyEncoder


class Database():

    def __init__(self):
        self.db_session = scoped_session(sessionmaker(bind=engine))
        self.user_data = ()

    # write for register
    def register_user(self, username, password, email):
        all_users = self.db_session.query(User.username, User.email)
        if not all_users:
            new_user = User(username=username,
                            password=self.hash_password(password), email=email)
            self.db_session.add(new_user)
            self.db_session.commit()
            return Response(json.dumps({'message': 'Zarejestrowano pomyślnie'}), status=201, mimetype="application/json")
        else:
            for one_user in all_users:
                if one_user[0] == username:
                    return Response(json.dumps({'message': 'Użytkownik o podanej nazwie już istnieje'}), status=400, mimetype="application/json")
                elif one_user[1] == email:
                    return Response(json.dumps({'message': 'Adres email jest już w użyciu'}), status=400, mimetype="application/json")
        new_user = User(username=username,
                        password=self.hash_password(password), email=email)
        self.db_session.add(new_user)
        self.db_session.commit()
        self.db_session.close()
        return Response(json.dumps({'message': 'Zarejestrowano pomyślnie'}), status=201, mimetype="application/json")

    # select for login
    def login_user(self, username, password):
        users = self.db_session.query(User).filter_by(username=username).all()
        if not users:
            return False
        else:
            for user in users:
                user = user.__dict__
                user_pass = user['password']
            if self.verify_password(password, user_pass):
                self.user_data = (user['username'], user['user_id'])
                return True
            else:
                return False

    # select for info
    def select_for_info(self, id_us):
        users = self.db_session.query(
            User.username).filter_by(user_id=id_us).all()
        self.db_session.close()
        if not users:
            return False
        else:
            return users[0]

    # password security

    def hash_password(self, nothashed):
        return pbkdf2_sha256.hash(nothashed)

    def verify_password(self, user_password, database_password):
        return pbkdf2_sha256.verify(user_password, database_password)

    def mark_lesson_as_completed(self, user_id, lesson_id):

        exists = self.db_session.query(Lesson).filter_by(
            user_id=user_id).scalar() is None
        lesson_name = "lesson" + str(lesson_id+1)
        if (exists):
            lesson = Lesson(user_id=user_id)
            self.db_session.add(lesson)
            self.db_session.query(Lesson).filter_by(
                user_id=user_id).update({lesson_name: True})
            self.db_session.commit()
        else:
            self.db_session.query(Lesson).filter_by(
                user_id=user_id).update({lesson_name: True})
            self.db_session.commit()
            self.db_session.close()

    def load_lessons_status(self, user_id):
        try:
            lesson_details = self.db_session.query(
                Lesson).filter_by(user_id=user_id).one()
        except NoResultFound:
            print ('No result was found')
        except MultipleResultsFound:
            print ('Multiple results were found')
        return (json.dumps(lesson_details, cls=AlchemyEncoder))


if __name__ == "__main__":
    db = Database()
