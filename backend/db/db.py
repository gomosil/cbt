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
            name = self.db.lectures.find_one({'lecture_id': lec})['name']
            lecture_names.append(name)
        
        total_data = {'name': ret['name'], 'lectures': lecture_names}
        return total_data

    def get_professor_lecture_list(self, professor_id):
        lecture_ids = self.db.users.find_one({'id': professor_id})['lectures']
        total_data = []
        for lecture_id in lecture_ids:
            lec = self.db.lectures.find_one({'lecture_id': lecture_id})
            data = {
                    "name": lec['name'],
                    "dept": lec['department'],
                    "lectured": lec['lectured'],
                    "count": len(lec["students"]),
                    "id": lecture_id
                }
            total_data.append(data)
        return total_data

if __name__ == "__main__":
    db = DB()
    professor_password = db.get_password("test")
    print(professor_password)

    professor_lecture = db.get_professor_info("test")
    print(professor_lecture)