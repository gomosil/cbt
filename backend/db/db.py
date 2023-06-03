from pymongo import MongoClient
import os


# Retrieve environment variables for containers.
server_name = os.getenv("MONGO_DB_URL")
server_port = int(os.getenv("MONGO_DB_PORT"))

class DB:
    """
    A class for handling DB related actions.
    """
    def __init__(self):
        self.client = MongoClient(server_name, server_port)
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


"""
For veryfing the DB class actually can retrieve data from database.
"""
if __name__ == "__main__":
    db = DB()

    # Verify the professor's password from id test.
    professor_password = db.get_password("test")
    print(professor_password)

    # Verify the professor's lecture names from id test.
    professor_lecture = db.get_professor_info("test")
    print(professor_lecture)