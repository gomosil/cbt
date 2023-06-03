from pymongo import MongoClient
import os

class DB:
    def __init__(self):
        server_name = os.getenv("MONGO_DB_URL")
        server_port = int(os.getenv("MONGO_DB_PORT"))
        self.client = MongoClient(server_name, server_port)
        self.db = self.client.applications
        print(f"Connecting to DB {server_name}:{server_port}")


    def get_password(self, professor_id):
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
        
        total_data = {'name': ret['name'], 'lectures': lecture_names}
        return total_data


if __name__ == "__main__":
    db = DB()
    professor_password = db.get_password("test")
    print(professor_password)

    professor_lecture = db.get_professor_info("test")
    print(professor_lecture)