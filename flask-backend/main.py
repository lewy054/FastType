from flask import Flask, render_template, request, flash, redirect, send_from_directory, url_for, jsonify, Response, session
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user


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
    if current_user.get_id():
        return render_template('home.html')
    return render_template('index.html')


@app.route('/home')
@login_required
def renderHome():
    if True:
        return render_template('home.html')
    else:
        return render_template('index.html')


@app.route('/signIn', methods=['GET', 'POST'])
def signIn():
    #database = rasberryDatabase.rasberryDatabase()
    if request.method == 'POST':
        username = request.get_json()["username"]
        password = request.get_json()["password"]
        if username == None or password == None:
            return 'Incorrect username or password', 401
        #logged = database.select_user_login_database(username, password)
        logged = True
        if logged:
            #login_user(User(database.user_data[2]))
            login_user(User(32))
            return 'OK', 200
        else:
            return 'Incorrect username or password', 401
    else:
        return render_template('index.html')


@login_manager.user_loader
def load_user(id_user):
    return User(id_user)


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return render_template('index.html')


app.run(debug=True)
