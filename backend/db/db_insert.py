import uuid
import os
from pymongo import MongoClient

# Retrieve environment variables for containers.
server_name = os.getenv("MONGO_DB_URL")
server_port = int(os.getenv("MONGO_DB_PORT"))
print(f"Connecting to DB {server_name}:{server_port}")

# Connect to DB and make collection named applications.
client = MongoClient(server_name, server_port)
db = client.applications 
# Just in case we might have changed the DB's arch, drop prior one.
client.drop_database('applications') 

# Insert professor information to DB.
professor = [{
    'name': '정우진',
    'id': 'test',
    'password': 1234,
    'lectures': [521210, 465620, 525680]
},{ 'name': '유시환',
    'id': 'test2',
    'password': 1234,
    'lectures': [521210, 465620, 525680]
}]

db.users.insert_many(professor)

# Add lecture informations to DB.
lecture =[
    {
        'lecture_id': 521210,   # 교과목 번호
        'name': '고급모바일실험1 ',
        'lectured': 'false',    # 출강 여부
        'students': ['32####03', '32####71', '32####99', '32####84', '32####97', '32####88', '32####56', '32####83',
                     '32####25', '32####39'],
        'department': "모바일시스템공학과",
        'mid_attendance': str(uuid.uuid4())
    },
    {
        'lecture_id': 465620,
        'name': '자바프로그래밍 ',
        'lectured': 'false',
        'students': [ '32####93', '32####68', '32####23', '32####15', '32####80', '32####68',
                     '32####67', '32####08', '32####90', '32####42', '32####98', '32####54', '32####30', '32####87'],
        'department': "모바일시스템공학과",
        'mid_attendance': str(uuid.uuid4())
    },
    {
        'lecture_id': 525680,
        'name': '임베디드시스템및loT로의 활용',
        'lectured': 'false',
        'students': [ '32####87', '32####06', '32####63', '32####35', '32####12', '32####74', '32####22', '32####94',
                     '32####16', '32####77', '32####77', '32####75', '32####44', '32####42', '32####16' ],
        'department': "모바일시스템공학과",
        'mid_attendance': str(uuid.uuid4())
    }
]

db.lectures.insert_many(lecture)

# Add student's information into DB.
student = [
    {
        'student_id': '32####03',
        'name': '강형철',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####71',
        'name': '김민주',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####99',
        'name': '김수진',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },

    {
        'student_id': '32####56',
        'name': '김지훈',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####83',
        'name': '나윤진',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####25',
        'name': '덜거르마',
        'dept': '모바일시스템공학과',
         'attendance': 'false',
         'late': 'false',
         'missing': 'false'
    },
    {
         'student_id': '32####39',
         'name': '마이클',
         'dept': '모바일시스템공학과',
         'attendance': 'false',
         'late': 'false',
         'missing': 'false'
    },
    {
         'student_id': '32####93',
         'name': '무하마드',
         'dept': '모바일시스템공학과',
         'attendance': 'false',
         'late': 'false',
         'missing': 'false'
    },
    {
         'student_id': '32####68',
         'name': '박근남',
         'dept': '모바일시스템공학과',
         'attendance': 'false',
         'late': 'false',
         'missing': 'false'
     },
    {
        'student_id': '32####23',
        'name': '박민주',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####15',
        'name': '박범순',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####80',
        'name': '박유빈',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####68',
        'name': '박윤아',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
         'student_id': '32####84',
         'name': '김이수',
         'dept': '모바일시스템공학과',
         'attendance': 'false',
         'late': 'false',
         'missing': 'false'
    },

    {
        'student_id': '32####97',
        'name': '김준형',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####88',
        'name': '김지용',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####67',
        'name': '백광렬',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####08',
        'name': '서원형',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####90',
        'name': '손보경',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####42',
        'name': '신우재',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####98',
        'name': '심예린',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####54',
        'name': '양대한',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####30',
        'name': '양윤성',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####87',
        'name': '엄현호',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####87',
        'name': '이라은',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####06',
        'name': '이영주',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####63',
        'name': '임석민',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####35',
        'name': '자스퍼',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####12',
        'name': '전혜림',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####74',
        'name': '정민호',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####22',
        'name': '조세안케빈',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####94',
        'name': '조정희',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####16',
        'name': '최유진',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####77',
        'name': '최윤호',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####77',
        'name': '탤래토프 쇼한루흐',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####75',
        'name': '트란지아응웬충',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####44',
        'name': '트란티엔디엠퀸',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####42',
        'name': '피비 리',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    },
    {
        'student_id': '32####16',
        'name': '허남훈',
        'dept': '모바일시스템공학과',
        'attendance': 'false',
        'late': 'false',
        'missing': 'false'
    }
]

db.users.insert_many(student)