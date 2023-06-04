import string
import random
from flask import Flask, request, send_file, Response
from flask_cors import CORS
import json
import uuid
import qrcode
import os
from db.db import DB

app = Flask(__name__)
CORS(app)

db = DB()


@app.route('/login', methods=['POST'])
def login():
    """
    A function that deals with endpoint /login (POST)
    Since this is a testing function, this will return following id credential as valid
    ID: test / PW: 1234
    If the credentials were correct, this will return status code 200
    If the credentials were not correct, this will return status code 403.
    """
    data = request.get_json()
    professor_id = data.get('id')
    professor_password = data.get('password')

    try:
        password = db.get_password(professor_id)
        if str(professor_password) == str(password):
            return Response(status=200)
        else:
            return Response(status=403)

    except TypeError:

        return Response(status=403)
    
@app.route('/professor_info', methods=['POST'])
def professor_info():
    """
    A function that deals with endpoint /professor_info (POST)
    Since this is a testing function, this will return random professor information
    """
    data = request.get_json()
    professor_id = data.get('id')
    try:  # Try retrieving data from DB.
        professor_info = db.get_professor_info(professor_id)
        return Response(json.dumps(professor_info), status=200)
    except KeyError:  # If the professor ID was not found in db
        response = {"name": "", "lectures": []}
        return Response(json.dumps(response), status=200)        

@app.route('/lecture_list', methods=['POST'])
def lecture_list():
    """
    A function that deals with endpoint /lecture_info (GET)
    Since this is a testing function, this will return random data.
    """
    data = request.get_json()
    professor_id = data.get('id')
    try:  # Try retrieving data from DB.
        lecture_list = db.get_professor_lecture_list(professor_id)
        return Response(json.dumps(lecture_list), status=200)
    except KeyError:  # If the professor ID was not found in db
        response = []
        return Response(json.dumps(response), status=200)

@app.route('/lecture_details', methods=['POST'])
def lecture_details():
    """
    A function that deals with endpoint /lecture_students (GET)
    Since this is a testing function, this will return random data.
    """
    
    data = request.get_json()
    lecture_id = data.get('lecture_id')
    try:  # Try retrieving data from DB.
        student_list = db.get_lecture_details(lecture_id)
        return Response(json.dumps(student_list), status=200)
    except KeyError:  # If the lecture ID was not found in db
        response = []
        return Response(json.dumps(response), status=200)

@app.route('/generate_qr_code', methods=['POST'])
def generate_qr_code():
    data = request.get_json()
    lecture_id = data.get('lecture_id')
    admin_password = data.get('password')
    duration = data.get("duration")

    # Generate QR code using the UUID generated.
    tmp_uuid = str(uuid.uuid4())
    #base_url = os.getenv("BASE_URL")
    base_url = "http://g-k8s-master.isu.mosl"
    url = base_url + "/student/" + tmp_uuid
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(url)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    image_path = tmp_uuid + '.png'
    qr_image.save(image_path)
    
    # Add attendance session to DB.
    db.add_qr_code_url(lecture_id, tmp_uuid, duration, admin_password)

    print("Generated Attendance Session: " + tmp_uuid)
    return Response(json.dumps({'tmp_uuid': tmp_uuid}), status=200)

@app.route('/host_qr_code/<tmp_uuid>', methods=['GET'])
def host_qr_code(tmp_uuid):
    image_path = tmp_uuid + '.png'
    try:
        return send_file(image_path, mimetype='image/png')
    except:
        return Response(status=404)

@app.route('/attendance_session_info', methods=['POST'])
def attendance_session_info():
    data = request.get_json()
    tmp_uuid = data.get('tmp_uuid')
    try:  # Try retrieving data from DB.
        lecture_name = db.get_attendance_info(tmp_uuid)
        return Response(json.dumps(lecture_name), status=200)
    except KeyError:  # If the attendance session was not found in db
        response = {'name': "Unknown"}
        return Response(json.dumps(response), status=200)

@app.route('/lecture_attend', methods=['POST'])
def lecture_attend():
    """
    A function that deals with endpoint /lecture_attend (POST)
    Since this is a testing function, this will return following student as valid
    ID: test / ID: 1234
    If the student was correct, this will return status code 200
    If the student was not correct, this will return status code 403.
    """
    data = request.get_json()
    student_id = data.get('studentid')
    tmp_uuid = data.get('tmp_uuid')

    try:
        db.attendence_attend(tmp_uuid, student_id)
        return Response(status=200)
    except KeyError:
        return Response(json.dumps({'message': '수강중인 학생이 아닙니다.'}), status=403)
    except FileExistsError:
        return Response(json.dumps({'message': '이미 중간 출석을 완료했습니다.'}), status=403)
    except TimeoutError:
        return Response(json.dumps({'message': '중간 출석이 마감되었습니다.'}), status=403)   
    except:
        return Response(json.dumps({'message': '알려지지 않은 에러입니다.'}), status=403)

@app.route('/stop_attendance', methods=['POST'])
def stop_attendance():
    data = request.get_json()
    tmp_uuid = data.get('tmp_uuid')
    admin_password = data.get('admin_password')

    try:
        db.stop_attendance(tmp_uuid, admin_password)
        return Response(status=200)
    except:
        return Response(status=403)

@app.route('/extend_attendance', methods=['POST'])
def extend_attendance():
    data = request.get_json()
    tmp_uuid = data.get('tmp_uuid')
    admin_password = data.get('admin_password')
    duration = data.get('duration')

    try:
        db.extend_attendance(tmp_uuid, admin_password, duration)
        return Response(status=200)
    except:
        return Response(status=403)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)