import os.path
from flask import Response
import bcrypt
import json
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.orm.exc import NoResultFound, MultipleResultsFound
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify
from sqlalchemy.sql.elements import and_
from alchemyEncoder import AlchemyEncoder
import map_database as db


class Database():

    def __init__(self):
        self.db_session = scoped_session(sessionmaker(bind=db.engine))
        self.user_data = ()

    # write for register
    def register_user(self, username, password, email):
        all_users = self.db_session.query(db.User.username, db.User.email).all()
        if not all_users:
            new_user = db.User(username=username, password=self.hash_password(password), email=email)
            self.db_session.add(new_user)
            self.db_session.commit()
            return Response(json.dumps({'message': 'Zarejestrowano pomyślnie'}), status=201, mimetype="application/json")
        else:
            for one_user in all_users:
                if one_user[0] == username:
                    return Response(json.dumps({'message': 'Użytkownik o podanej nazwie już istnieje'}), status=400, mimetype="application/json")
                elif one_user[1] == email:
                    return Response(json.dumps({'message': 'Adres email jest już w użyciu'}), status=400, mimetype="application/json")

        new_user = db.User(username=username, password=self.hash_password(password), email=email)
        self.db_session.add(new_user)
        self.db_session.commit()
        self.db_session.close()
        return Response(json.dumps({'message': 'Zarejestrowano pomyślnie'}), status=201, mimetype="application/json")

    # select for login
    def login_user(self, username, password):
        users = self.db_session.query(db.User).filter_by(username=username).all()
        self.db_session.close()
        if not users:
            return False
        else:
            for user in users:
                user = user.__dict__
                user_pass = user['password']
            if self.verify_password(password, user_pass):
                self.user_data = (user['username'], user['id'])
                return True
            else:
                return False

    # select for info
    def select_for_info(self, id_us):
        users = self.db_session.query(db.User.username).filter_by(id=id_us).all()
        self.db_session.close()
        if not users:
            return False
        else:
            return users[0]

    # password security
    def hash_password(self, nothashed):
        return bcrypt.hashpw(nothashed.encode('utf8'), bcrypt.gensalt())

    def verify_password(self, user_password, database_password):
        return bcrypt.checkpw(user_password.encode('utf8'), database_password)

    def mark_lesson_as_completed(self, id, lesson_id, time, wpm):
        exists = self.check_lesson_status(id, lesson_id)
        if (exists):
            all_lessons = self.get_all_lesson_with_id(lesson_id)
            for lesson in all_lessons:
                lesson = lesson.__dict__
                if(int(lesson['user_id']) == int(id)):
                    self.db_session.query(db.UserLesson).filter(db.UserLesson.user_id == id).filter(db.UserLesson.lesson_id == lesson['lesson_id']).update({db.UserLesson.wpm: wpm, db.UserLesson.time: time})
        else:
            lesson = db.Lesson(lesson_id=lesson_id)
            a = db.UserLesson(wpm=wpm, time=time, lesson_id=lesson_id, user_id=id)
            a.lesson = db.User()
            lesson.users.append(a)
            self.db_session.add(lesson)
        self.db_session.commit()
        self.db_session.close()

    def load_lessons_status(self, id):
        lesson_details = []
        data_set = {}
        try:
            lessons = self.db_session.query(db.Lesson).join(db.Lesson.users).filter_by(user_id=id).all()
            for lesson in lessons:
                lesson = lesson.__dict__
                lesson_details.append(lesson['lesson_id'])
            for i in lesson_details:
                data_set["lesson" + str(i)] = 1
        except NoResultFound:
            self.db_session.close()
            print('No result was found')
        except MultipleResultsFound:
            self.db_session.close()
            print('Multiple results were found')
        self.db_session.close()
        return (json.dumps(data_set, cls=AlchemyEncoder))

    def mark_achievement_as_completed(self, id, achievement_id):
        exists = self.check_achievement_status(id, achievement_id)
        if not (exists):
            achievement = db.Achievement(achievement_id=achievement_id)
            a = db.UserAchievement(achievement_id=achievement_id, user_id=id)
            a.achievement = db.User()
            achievement.users.append(a)
            self.db_session.add(achievement)
            self.db_session.commit()
            self.db_session.close()
            return 1
        return 0

    def load_achievements_status(self, id):
        achievement_details = []
        data_set = {}
        try:
            achievements = self.db_session.query(db.Achievement).join(db.Achievement.users).filter_by(user_id=id).all()
            print(achievements)
            for achievement in achievements:
                achievement = achievement.__dict__
                achievement_details.append(achievement['achievement_id'])
            for i in achievement_details:
                data_set["achievement" + str(i)] = 1
        except NoResultFound:
            self.db_session.close()
            print('No result was found')
        except MultipleResultsFound:
            self.db_session.close()
            print('Multiple results were found')
        self.db_session.close()
        return (json.dumps(data_set, cls=AlchemyEncoder))

    def how_many_lessons_done(self, id):
        count = self.db_session.query(db.Lesson).filter(db.Lesson.users.any(user_id=id)).count()
        self.db_session.close()
        return count

    def how_many_achievements_done(self, id):
        try:
            achievements = self.db_session.query(db.UserAchievement).filter_by(user_id=id).all()
        except NoResultFound:
            print('No result was found')
            return 0
        self.db_session.close()
        return len(achievements)

    def avg_wpm(self, id):
        try:
            user_lessons = self.db_session.query(db.UserLesson).filter_by(user_id=id).all()
        except NoResultFound:
            print('No result was found')
            return 0, 0
        except MultipleResultsFound:
            print('Multiple results were found')
            return 0, 0

        all_lessons = self.db_session.query(db.UserLesson).all()
        self.db_session.close()
        return user_lessons, all_lessons

    def check_lesson_status(self, id, lesson_id):
        users_lesson = self.db_session.query(db.UserLesson).filter_by(user_id=id).all()
        for lesson in users_lesson:
            lesson = lesson.__dict__
            database_lesson_id = self.get_lesson_id(lesson['lesson_id'])
            if(database_lesson_id['lesson_id'] == lesson_id):
                self.db_session.close()
                return True
        self.db_session.close()
        return False

    def check_achievement_status(self, id, achievement_id):
        users_achievementn = self.db_session.query(db.UserAchievement).filter_by(user_id=id).all()
        for achievement in users_achievementn:
            achievement = achievement.__dict__
            database_achievement_id = self.get_achievement_id(achievement['achievement_id'])
            if(database_achievement_id['achievement_id'] == achievement_id):
                self.db_session.close()
                return True
        self.db_session.close()
        return False

    def get_lesson_details(self, id, lesson_id):
        lessons = self.db_session.query(db.UserLesson).filter_by(user_id=id).all()
        for lesson in lessons:
            lesson = lesson.__dict__
            user_lesson = self.db_session.query(db.Lesson).filter_by(id=lesson['lesson_id']).one()
            user_lesson = user_lesson.__dict__
            if(user_lesson['lesson_id'] == lesson_id):
                self.db_session.close()
                return lesson, user_lesson['lesson_id']

    def get_all_lesson_with_id(self, lesson_id):
        lessons = self.db_session.query(
            db.UserLesson,
        ).filter(
            db.UserLesson.lesson_id == db.Lesson.id,
        ).filter(
            db.Lesson.lesson_id == lesson_id,
        ).all()
        self.db_session.close()
        return lessons

    def get_lesson_id(self, lesson_id):
        try:
            exists = self.db_session.query(db.Lesson).filter_by(id=lesson_id).one()
            self.db_session.close()
            return exists.__dict__
        except NoResultFound:
            print('No result was found')
            self.db_session.close()
            return False

    def get_achievement_id(self, achievement_id):
        try:
            exists = self.db_session.query(db.Achievement).filter_by(id=achievement_id).one()
            self.db_session.close()
            return exists.__dict__
        except NoResultFound:
            print('No result was found')
            self.db_session.close()
            return False

if __name__ == "__main__":
    db = Database()
