import sqlite3
from passlib.hash import pbkdf2_sha256


class Database():
    
    def __init__(self):
        self.user_data = ()

    # write for register
    def register_user(self, username, password, email):
        self.connect()
        self.cursor.execute('SELECT username, email FROM users')
        all_users = self.cursor.fetchall()
        if not all_users:
            self.cursor.execute('INSERT INTO users VALUES(NULL, ?, ?, ?);',
                                (username, self.hash_password(password), email))
            self.connection.commit()
            self.disconnect()
            return "User added"
        else:
            for one_user in all_users:
                if one_user[0] == username:
                    self.disconnect()
                    return "Username exists"
                elif one_user[1]==email:
                   return "Email exists"
        self.connection.commit()
        self.disconnect()
        print("user added")
        return "User added"

    # select for login
    def login_user(self, username, password):
        self.connect()
        self.cursor.execute(
            'SELECT * FROM users WHERE username = ?', (username,))
        users = self.cursor.fetchall()
        if not users:
            self.disconnect()
            return False
        else:
            for user in users:
                user_pass = user['password']
            if self.verify_password(password, user_pass):
                self.user_data = (user['username'], user['id'])
                self.disconnect()
                return True
            else:
                self.disconnect()
                return False

    # select for info
    def select_for_info(self, id_us):
        self.connect()
        self.cursor.execute(
            'SELECT username FROM users WHERE id = ?', (id_us,))
        users = self.cursor.fetchall()
        if not users:
            self.disconnect()
            return False
        else:
            self.disconnect()
            return users[0]


    # password security
    def hash_password(self, nothashed):
        return pbkdf2_sha256.hash(nothashed)

    def verify_password(self, user_password, database_password):
        return pbkdf2_sha256.verify(user_password, database_password)


    def connect(self):
        self.connection = sqlite3.connect(
            'database.db', check_same_thread=False)
        self.connection.row_factory = sqlite3.Row
        self.cursor = self.connection.cursor()

    def disconnect(self):
        self.cursor.close()
        self.connection.close()


if __name__ == "__main__":
    db = Database()
    #db.create_database()