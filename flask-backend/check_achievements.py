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
