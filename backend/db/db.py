from pymongo import MongoClient
from datetime import datetime, timedelta
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

    def get_lecture_details(self, lecture_id):
        lecture = self.db.lectures.find_one({'lecture_id': lecture_id})
        students = lecture['students']
        total_data = []

        for student_id in students:
            student_info = self.db.students.find_one({'student_id': student_id})
            data = {
                "student_name": student_info['name'],
                "student_id": student_info["student_id"],
                "department": student_info["dept"],
                "attendance": student_info["attendance"],
                "late": student_info["late"],
                "missing": student_info["missing"],
            }

            total_data.append(data)
        return total_data

    def add_qr_code_url(self, lecture_id, tmp_uuid, duration, password):
        data = {
            "lecture_id": lecture_id,
            "lecture_name": self.db.lectures.find_one({'lecture_id': lecture_id})['name'],
            "tmp_uuid": tmp_uuid,
            "starting_time": datetime.now(),
            "duration": duration,
            "is_valid": True,
            "password": password
        }
        self.db.attendance_check.insert_one(data)

    def get_session_lecture_name(self, lecture_id):
        lecture = self.db.attendance_check.find_one({'lecture_id': lecture_id})
        return {'name': lecure['name']}

    def get_attendance_info(self, tmp_uuid):
        attendance_session = self.db.attendance_check.find_one({'tmp_uuid': tmp_uuid})

        current_time = datetime.now()
        duration = attendance_session['duration']
        expiration = attendance_session['starting_time'] + timedelta(seconds=duration)  # Calculate expiration time.
        is_valid = attendance_session['is_valid']
        if current_time < expiration:  # The attendance is valid
            return {'lecture_name': attendance_session['lecture_name'], 'is_valid': is_valid}
        else:  # If the attendance was expired
            attendance_session['is_valid'] = False  # Make this expired and update it to DB.
            self.db.attendance_check.update_one({'tmp_uuid': tmp_uuid}, {"$set": attendance_session})
            return {'lecture_name': attendance_session['lecture_name'], 'is_valid': False}

    def stop_attendance(self, tmp_uuid, password):
        attendance_session = self.db.attendance_check.find_one({'tmp_uuid': tmp_uuid})
        if str(password) == str(attendance_session['password']):   # If input password matched,
            attendance_session['is_valid'] = False  # Expire the attendance session.
            self.db.attendance_check.update_one({'tmp_uuid': tmp_uuid}, {"$set": attendance_session})

    def extend_attendance(self, tmp_uuid, password, duration):
        attendance_session = self.db.attendance_check.find_one({'tmp_uuid': tmp_uuid})
        if str(password) == str(attendance_session['password']):   # If input password matched,
            attendance_session['duration'] += duration  # Extend the duration by given duration.
            self.db.attendance_check.update_one({'tmp_uuid': tmp_uuid}, {"$set": attendance_session})

    def attendence_attend(self, tmp_uuid, student_id):
        attendance_session = self.db.attendance_check.find_one({'tmp_uuid': tmp_uuid})
        current_time = datetime.now()
        expiration = attendance['starting_time'] + timedelta(seconds=duration)  # Calculate expiration time.

        if current_time < expiration:  # The attendance session is valid.
            student = self.db.students.find_one({'student_id': student_id})
            student['missing'] = False
            self.db.students.update_one({'student_id': student_id}, student) # Mark user as attending the class.
        else:  # If the attendance was expired
            raise TimeoutError

if __name__ == "__main__":
    db = DB()
    professor_password = db.get_password("test")
    print(professor_password)

    professor_lecture = db.get_professor_info("test")
    print(professor_lecture)