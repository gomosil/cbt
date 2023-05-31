from pymongo import MongoClient


class DB:
    def __init__(self):
        self.client = MongoClient('localhost', 27017)
        self.db = self.client.applications

    def get_password(self, professor_id):
        # professor_id = self.db.get('id')
        ret = self.db.users.find_one({'id': professor_id})
        password = ret['password']
        return password

    def get_professor_info(self, professor_id):
        lecture_names = []
        ret = self.db.users.find_one({'id': professor_id})
        lecs = ret['lectures']
        for lec in lecs:
            x = self.db.lectures.find_one({'lecture_id': lec})['name']
            lecture_names.append(x)
        return lecture_names


if __name__ == "__main__":
    db = DB()
    professor_password = db.get_password("test")
    print(professor_password)
    professor_lecture = db.get_professor_info("test")
    print(professor_lecture)