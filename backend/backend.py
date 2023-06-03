import string
import random
from flask import Flask, request, send_file, Response
from flask_cors import CORS
import json
import qrcode
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


def generate_random_url():
    length = 10
    characters = string.ascii_letters + string.digits
    random_url = ''.join(random.choice(characters) for _ in range(length))
    return random_url


@app.route('/qr_code', methods=['GET'])
def generate_qr_code():
    # url = generate_random_url()
    url = "http://172.25.244.37:3000/student/foo-bar"
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(url)
    qr.make(fit=True)
    qr_image = qr.make_image(fill_color="black", back_color="white")
    image_path = 'url.png'
    qr_image.save(image_path)
    return send_file(image_path, mimetype='image/png')


@app.route('/lecture_name', methods=['GET'])
def lecture_name():
    return Response(json.dumps({'name': "고급모바일실험"}), status=200)


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
    name = data.get('name')
    student_id = data.get('studentid')
    print(data)

    # Check Credentials, but this needs to be implemented in the future!!
    if name == "test" and student_id == "1234":
        return Response(status=200)
    else:
        return Response(status=403)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)