import json
import re
from flask import Flask, render_template, request, flash, redirect, send_from_directory, url_for, Response, session
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
import database as db
import os
from flask import send_from_directory

app = Flask("__main__")
app.secret_key = 'A0Zr98j/3yX R~XHH!jmN]LWX/,?RT'
CORS(app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'signIn'


class User(UserMixin):

    def __init__(self, id):
        self.id = id
    '''
    def __repr__(self):
        return "%d/%s" % (self.id, self.name)
    '''


@app.route("/", methods=['GET', 'POST'])
def main():
    return render_template('index.html')


@app.route('/getUsername', methods=['GET'])
def getUsername():
    if current_user.get_id():
        database = db.Database()
        temp_data = database.select_for_info(current_user.get_id())
        username = temp_data[0]
        return Response(json.dumps({'username': f'{username}'}),
                        status=200,
                        mimetype="application/json")
    else:
        return Response(
            status=203,
            mimetype="application/json")


@app.route('/login', methods=['GET', 'POST'])
def signIn():
    database = db.Database()
    if request.method == 'POST':
        username = request.get_json()["username"]
        password = request.get_json()["password"]
        remember = request.get_json()["remember"]
        print(remember)
        if(remember):
            remember_me()
        else:
            dont_remember()

        if username == None or password == None:
            return Response(json.dumps({'message': 'Nieprawidłowa nazwa użytkownika i/lub hasło'}), status=401, mimetype="application/json")
        logged = database.login_user(username, password)
        if logged:
            login_user(User(database.user_data[1]))
            return Response(json.dumps({'message': 'Zalogowano pomyślnie'}), status=200, mimetype="application/json")
        else:
            return Response(json.dumps({'message': 'Nieprawidłowa nazwa użytkownika i/lub hasło'}), status=401, mimetype="application/json")
    else:
        return render_template('index.html')


def dont_remember():
    session.permanent = False


def remember_me():
    session.permanent = True


@app.route('/register', methods=['GET', 'POST'])
def register():
    database = db.Database()
    data = request.get_json()
    data = json.loads(json.dumps(data))
    if request.method == 'POST':
        name = data["username"]
        email = data["email"]
        password = data["password"]
        passwordConfirm = data["confPass"]
        if name == None or name == "" or password == None or password == "" or email == None or email == "" or passwordConfirm == None or passwordConfirm == "":
            return Response(json.dumps({'message': 'Wypełnij wszystkie pola'}), status=400, mimetype="application/json")
        if not password == passwordConfirm:
            return Response(json.dumps({'message': 'Hasła się nie zgadzają'}), status=400, mimetype="application/json")
        if not validate_email(email):
            return Response(json.dumps({'message': 'Podaj poprawny adres email'}), status=400, mimetype="application/json")
        return database.register_user(name, password, email)
    else:
        return Response(status=405, mimetype="application/json")


@app.route('/completedLesson', methods=['GET', 'POST'])
def mark_lesson_as_completed():
    if request.method == 'POST':
        database = db.Database()
        lessonId = request.get_json()["lesson_id"]
        database.mark_lesson_as_completed(current_user.get_id(), lessonId)
        return Response(status=200)
    else:
        return render_template('index.html')


@app.route('/getLessonsStatus', methods=['GET', 'POST'])
def get_lesson_status():
    database = db.Database()
    lessons = database.load_lessons_status(current_user.get_id())
    return Response(json.dumps({'data': lessons}), status=200, mimetype="application/json")


@app.route('/getAchievemenetsStatus', methods=['GET', 'POST'])
def get_achievement_status():
    database = db.Database()
    achievements = database.load_achievements_status(current_user.get_id())
    return Response(json.dumps({'data': achievements}), status=200, mimetype="application/json")


@app.route('/completedAchievement', methods=['GET', 'POST'])
def mark_achievement_as_completed():
    if request.method == 'POST':
        database = db.Database()
        lessonId = request.get_json()["achievement_id"]
        database.mark_achievement_as_completed(current_user.get_id(), lessonId)
        return Response(status=200)
    else:
        return render_template('index.html')


@app.errorhandler(404)
def page_not_found(error):
    return render_template('index.html'), 404


@login_manager.user_loader
def load_user(id_user):
    return User(id_user)


@app.route('/practice', methods=['GET', 'POST'])
def practice():
    return render_template('index.html')


@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return render_template('index.html')


def validate_email(email):
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if(re.search(regex, email)):
        return True
    else:
        return False

app.run(debug=True)
