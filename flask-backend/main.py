import json
import re
from flask import Flask, render_template, request, flash, redirect, send_from_directory, url_for, Response, session
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
import database as db
from check_achievements import AchievementCheck
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
        if(temp_data):
            username = temp_data[0]
            return Response(json.dumps({'username': f'{username}'}),
                            status=200,
                            mimetype="application/json")
        else:
            return Response(status=203, mimetype="application/json")
    else:
        return Response(status=203, mimetype="application/json")


@app.route('/login', methods=['GET', 'POST'])
def signIn():
    database = db.Database()
    if request.method == 'POST':
        username = request.get_json()["username"]
        password = request.get_json()["password"]
        remember = request.get_json()["remember"]
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
        if len(password) > 72:
            return Response(json.dumps({'message': 'Hasło za długie, maksymalna ilość znaków to 72'}), status=400, mimetype="application/json")
        return database.register_user(name, password, email)
    else:
        return Response(status=405, mimetype="application/json")


@app.route('/completedLesson', methods=['GET', 'POST'])
def mark_lesson_as_completed():
    if request.method == 'POST':
        database = db.Database()
        data = request.get_json()
        lessonId = int(data["lesson_id"])
        time = '0'
        wpm = 0
        if('time' in data):
            time = data["time"]
        if('wpm' in data):
            wpm = data["wpm"]
        database.mark_lesson_as_completed(current_user.get_id(), lessonId, time, wpm)
        achievement_check = AchievementCheck()
        achiev_id = achievement_check.check_lesson_id(current_user.get_id(), lessonId)
        achiev_id_lessons = achievement_check.how_many_done(current_user.get_id())
        achiev_id_wpm = achievement_check.how_fast(current_user.get_id(), wpm)
        if(achiev_id != -1 or achiev_id_lessons != -1 or achiev_id_wpm != -1):
            return Response(json.dumps([{'id': achiev_id}, {'id':achiev_id_lessons}, {'id': achiev_id_wpm}]), status=200, mimetype="application/json")
        else:
            return Response(status=204, mimetype="application/json")
    else:
        return render_template('index.html')


@app.route('/getLessonsStatus', methods=['GET', 'POST'])
def get_lesson_status():
    database = db.Database()
    lessons = database.load_lessons_status(current_user.get_id())
    return Response(json.dumps({'data': lessons}), status=200, mimetype="application/json")


@app.route('/getAchievementsStatus', methods=['GET', 'POST'])
def get_achievement_status():
    database = db.Database()
    achievements = database.load_achievements_status(current_user.get_id())
    return Response(json.dumps({'data': achievements}), status=200, mimetype="application/json")


@app.route('/completedAchievement', methods=['GET', 'POST'])
def mark_achievement_as_completed():
    if request.method == 'POST':
        database = db.Database()
        achievement_id = request.get_json()["achievement_id"]
        database.mark_achievement_as_completed(current_user.get_id(), achievement_id)
        return Response(status=200)
    else:
        return render_template('index.html')



@app.route('/checkAchievementsFreeMode', methods=['GET', 'POST'])
def check_achievements_free_mode():
    if request.method == 'POST':
        database = db.Database()
        data = request.get_json()
        wpm = data["wpm"]
        achievement_check = AchievementCheck()
        # achiev_id_lessons = achievement_check.how_many_done(current_user.get_id())
        achiev_id_wpm = achievement_check.how_fast_free_mode(current_user.get_id(), wpm)
        if(achiev_id_wpm != -1):
            return Response(json.dumps([{'id': achiev_id_wpm}]), status=200, mimetype="application/json")
        else:
            return Response(status=204, mimetype="application/json")
    else:
        return render_template('index.html')


@app.route('/getAvgValues', methods=['GET', 'POST'])
def get_avg_values():
    database = db.Database()
    how_many_achievements = database.how_many_achievements_done(current_user.get_id())
    how_many_lessons = database.how_many_lessons_done(current_user.get_id())
    user_lessons, all_lessons = database.avg_wpm(current_user.get_id())

    others_wpm = 0
    others_wpm_count = 0
    user_wpm = 0
    user_wpm_count = 0
    others_avg_wpm = 0
    avg_wpm = 0
    for lesson in all_lessons:
        if not lesson in user_lessons:
            lesson = lesson.__dict__
            if lesson['wpm'] != 0:
                others_wpm += lesson['wpm']
                others_wpm_count += 1

    for user_lesson in user_lessons:
        user_lesson = user_lesson.__dict__
        if user_lesson['wpm'] != 0:
            user_wpm += user_lesson['wpm']
            user_wpm_count += 1
    if(user_wpm_count):
        avg_wpm = user_wpm/user_wpm_count
    if(others_wpm_count):
        others_avg_wpm = others_wpm/others_wpm_count
    return Response(json.dumps({'achievement_count': how_many_achievements, 'lesson_count': how_many_lessons, 'avgWpm': avg_wpm, 'othersWpm': others_avg_wpm}), status=200, mimetype="application/json")


@app.route('/getLessonDetails', methods=['GET', 'POST'])
def get_lesson_details():
    if request.method == 'POST':
        database = db.Database()
        lesson_id = request.get_json()["lessonId"]
        lesson_exists = database.check_lesson_status(current_user.get_id(), lesson_id)
        if(lesson_exists):
            user_lesson_details, database_lesson_id = database.get_lesson_details(current_user.get_id(), lesson_id)
            all_lessons = database.get_all_lesson_with_id(lesson_id)
            lower_time = higher_time = same_time = lower_wpm = higher_wpm = same_wpm = 0
            for one_lesson in all_lessons:
                one_lesson = one_lesson.__dict__
                if not database.get_lesson_id(one_lesson['lesson_id']) == database_lesson_id:
                    if user_lesson_details['wpm'] < one_lesson['wpm']:
                        higher_wpm += 1
                    elif user_lesson_details['wpm'] > one_lesson['wpm']:
                        lower_wpm += 1
                    else:
                        same_wpm += 1

                    if user_lesson_details['time'] < one_lesson['time']:
                        lower_time += 1
                    elif user_lesson_details['time'] > one_lesson['time']:
                        higher_time += 1
                    else:
                        same_time += 1

            time_count = same_time + higher_time + lower_time
            wpm_count = same_wpm + higher_wpm + lower_wpm
            if (time_count):
                time_one_percentage = 100 / time_count
                lower_time_percentage = round(lower_time * time_one_percentage)
                higher_time_percentage = round(higher_time * time_one_percentage)
                same_time_percentage = round(same_time * time_one_percentage)
                total_time = lower_time_percentage + higher_time_percentage + same_time_percentage
                if(total_time != 100):
                    missing = 100 - total_time
                    lower_time_percentage += missing
            else:
                # if only a user record exists
                lower_time_percentage = 100
                higher_time_percentage = 0
                same_time_percentage = 0
            if (wpm_count):
                wpm_one_percentage = 100 / wpm_count
                lower_wpm_percentage = round(lower_wpm * wpm_one_percentage)
                higher_wpm_percentage = round(higher_wpm * wpm_one_percentage)
                same_wpm_percentage = round(same_wpm * wpm_one_percentage)
                total_wpm = lower_wpm_percentage + higher_wpm_percentage + same_wpm_percentage
                if(total_wpm != 100):
                    missing = 100 - total_wpm
                    lower_wpm_percentage += missing
            else:
                # if only a user record exists
                lower_wpm_percentage = 100
                higher_wpm_percentage = 0
                same_wpm_percentage = 0

            return Response(json.dumps({'time': user_lesson_details['time'], 'wpm': user_lesson_details['wpm'], 'time_slower': lower_time_percentage,
                                        'time_faster': higher_time_percentage, 'time_same': same_time_percentage, 'wpm_faster': higher_wpm_percentage,
                                        'wpm_slower': lower_wpm_percentage, 'wpm_same': same_wpm_percentage}), status=200, mimetype="application/json")
        else:
            return Response(status=204)
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


@app.route('/stats', methods=['GET', 'POST'])
def stats():
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


if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
