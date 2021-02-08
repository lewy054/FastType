import database as db


class AchievementCheck():

    def how_many_done(self, user_id):
        '''Check if any achievement such as "finish 30 lessons" has been completed'''
        database = db.Database()
        how_many = database.how_many_lessons_done(user_id)
        if (how_many >= 30 and how_many < 50):
            return_code = database.mark_achievement_as_completed(user_id, 1)
            # if achievement had already been marked completed the return code is 0
            if(return_code):
                return 1
        elif(how_many >= 50 and how_many < 70):
            return_code = database.mark_achievement_as_completed(user_id, 2)
            if(return_code):
                return 2
        elif(how_many >= 70):
            return_code = database.mark_achievement_as_completed(user_id, 3)
            if(return_code):
                return 3
        return -1

    def check_lesson_id(self, user_id, lesson_id):
        database = db.Database()
        if(lesson_id == 0):
            return_code = database.mark_achievement_as_completed(user_id, 0)
            if(return_code):
                return 0
        elif(lesson_id == 45):
            return_code = database.mark_achievement_as_completed(user_id, 7)
            if(return_code):
                return 7
        elif(lesson_id == 87):
            return_code = database.mark_achievement_as_completed(user_id, 8)
            if(return_code):
                return 8
        return -1

    def how_fast(self, user_id, wpm):
        database = db.Database()
        if (wpm > 20 and wpm <= 50):
            return_code = database.mark_achievement_as_completed(user_id, 4)
            if(return_code):
                return 4
        elif(wpm > 50 and wpm <= 70):
            return_code = database.mark_achievement_as_completed(user_id, 5)
            if(return_code):
                return 5
        elif(wpm > 70):
            return_code = database.mark_achievement_as_completed(user_id, 6)
            if(return_code):
                return 6
        return -1

    def how_fast_free_mode(self, user_id, wpm):
        database = db.Database()
        if (wpm > 50 and wpm <= 70):
            return_code = database.mark_achievement_as_completed(user_id, 11)
            if(return_code):
                return 11
        elif(wpm > 70 and wpm <= 100):
            return_code = database.mark_achievement_as_completed(user_id, 12)
            if(return_code):
                return 12
        elif(wpm > 100):
            return_code = database.mark_achievement_as_completed(user_id, 13)
            if(return_code):
                return 13
        return -1
