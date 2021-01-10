import os.path
from passlib.hash import pbkdf2_sha256
from flask import Response
import json
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from user import User
from flask import jsonify
from lesson import Lesson
from user_lesson import UserLesson
from achievement import Achievement
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
            new_user = User(username=username, password=self.hash_password(password), email=email)
            self.db_session.add(new_user)
            self.db_session.commit()
            return Response(json.dumps({'message': 'Zarejestrowano pomyślnie'}), status=201, mimetype="application/json")
        else:
            for one_user in all_users:
                if one_user[0] == username:
                    return Response(json.dumps({'message': 'Użytkownik o podanej nazwie już istnieje'}), status=400, mimetype="application/json")
                elif one_user[1] == email:
                    return Response(json.dumps({'message': 'Adres email jest już w użyciu'}), status=400, mimetype="application/json")

        new_user = User(username=username, password=self.hash_password(password), email=email)
        self.db_session.add(new_user)
        self.db_session.commit()
        self.db_session.close()
        return Response(json.dumps({'message': 'Zarejestrowano pomyślnie'}), status=201, mimetype="application/json")

    # select for login
    def login_user(self, username, password):
        users = self.db_session.query(User).filter_by(username=username).all()
        self.db_session.close()
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
        users = self.db_session.query(User.username).filter_by(user_id=id_us).all()
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

    def mark_lesson_as_completed(self, user_id, lesson_id, time, wpm):
        exists = self.check_lesson_status(user_id, lesson_id)
        if (exists):
            lesson_id = self.db_session.query(
                Lesson,
            ).filter(
                User.user_id == user_id,
            ).filter(
                User.user_id == UserLesson.user_id,
            ).filter(
                UserLesson.lesson_id == Lesson.id,
            ).filter(
                Lesson.lesson_id == lesson_id,
            ).one()
            lesson_id = lesson_id.__dict__
            lesson_id = lesson_id['id']
            self.db_session.query(Lesson).filter_by(id=lesson_id).update({'wpm': wpm, 'time': time})
            self.db_session.commit()
            self.db_session.close()
        else:
            lesson = Lesson(lesson_id=lesson_id, wpm=wpm, time=time)
            self.db_session.add(lesson)
            self.db_session.commit()
            user_lesson = UserLesson(user_id=user_id, lesson_id=lesson.id)
            self.db_session.add(user_lesson)
            self.db_session.commit()
            self.db_session.close()

    def load_lessons_status(self, user_id):
        lesson_details = []
        data_set = {}
        try:
            lessons = self.db_session.query(
                UserLesson).filter_by(user_id=user_id).all()
            for lesson in lessons:
                lesson = lesson.__dict__
                lesson_details.append(self.db_session.query(
                    Lesson).filter_by(id=lesson['lesson_id']).one())
            for i in lesson_details:
                i = i.__dict__
                data_set["lesson" + str(i['lesson_id'])] = 1
        except NoResultFound:
            self.db_session.close()
            print('No result was found')
        except MultipleResultsFound:
            self.db_session.close()
            print('Multiple results were found')
        self.db_session.close()
        return (json.dumps(data_set, cls=AlchemyEncoder))

    def mark_achievement_as_completed(self, user_id, achievemenet_id):
        no_exists = self.db_session.query(Achievement).filter_by(user_id=user_id).scalar() is None
        achievement_name = "achievement" + str(achievemenet_id+1)
        if (no_exists):
            achievement = Achievement(user_id=user_id)
            self.db_session.add(achievement)
            self.db_session.query(Achievement).filter_by(user_id=user_id).update({achievement_name: True})
            self.db_session.commit()
            self.db_session.close()
            return 1
        return 0

    def load_achievements_status(self, user_id):
        achievement_details = ''
        try:
            achievement_details = self.db_session.query(Achievement).filter_by(user_id=user_id).one()
            self.db_session.close()
        except NoResultFound:
            self.db_session.close()
            print('No result was found')
        except MultipleResultsFound:
            self.db_session.close()
            print('Multiple results were found')
        return (json.dumps(achievement_details, cls=AlchemyEncoder))

    def how_many_lessons_done(self, user_id):
        count = self.db_session.query(
            Lesson,
        ).filter(
            Lesson.id == UserLesson.lesson_id,
        ).filter(
            UserLesson.user_id == User.user_id,
        ).filter(
            User.user_id == user_id,
        ).count()
        self.db_session.close()
        return count

    def how_many_achievements_done(self, user_id):
        try:
            achievements = self.db_session.query(Achievement).filter_by(user_id=user_id).one()
        except NoResultFound:
            print('No result was found')
            return 0
        except MultipleResultsFound:
            print('Multiple results were found')
            return 0
        how_many = 0
        achievements = achievements.__dict__
        for achievement in achievements.items():
            if(achievement[1] == 1):
                how_many += 1
        self.db_session.close()
        return how_many

    def avg_wpm(self, user_id):
        try:
            user_lessons = self.db_session.query(
                Lesson,
            ).filter(
                Lesson.id == UserLesson.lesson_id,
            ).filter(
                UserLesson.user_id == User.user_id,
            ).filter(
                User.user_id == user_id,
            ).all()
        except NoResultFound:
            print('No result was found')
            return 0, 0
        except MultipleResultsFound:
            print('Multiple results were found')
            return 0, 0

        all_lessons = self.db_session.query(Lesson).all()
        self.db_session.close()
        return user_lessons, all_lessons

    def check_lesson_status(self, user_id, lesson_id):
        exists = self.db_session.query(
            User, UserLesson, Lesson,
        ).filter(
            User.user_id == user_id,
        ).filter(
            User.user_id == UserLesson.user_id,
        ).filter(
            UserLesson.lesson_id == Lesson.id,
        ).filter(
            Lesson.lesson_id == lesson_id,
        ).scalar()
        self.db_session.close()
        if (exists):
            print('exists')
            return True
        else:
            print('NOexists')
            return False

    def get_lesson_details(self, user_id, lesson_id):
        lesson = self.db_session.query(
            Lesson,
        ).filter(
            User.user_id == user_id,
        ).filter(
            User.user_id == UserLesson.user_id,
        ).filter(
            UserLesson.lesson_id == Lesson.id,
        ).filter(
            Lesson.lesson_id == lesson_id,
        ).one()
        self.db_session.close()
        return lesson.__dict__

    def get_all_lesson_with_id(self, lesson_id):
        lessons  = self.db_session.query(Lesson).filter_by(lesson_id=lesson_id).all()
        self.db_session.close()
        return lessons


if __name__ == "__main__":
    db = Database()
