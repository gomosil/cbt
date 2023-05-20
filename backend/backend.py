import os
from flask import Flask, flash, request, redirect, url_for, Response
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

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
    password = data.get('password')
    print(data)

    # Check Credentials, but this needs to be implemented in the future!!
    if professor_id == "test" and password == "1234":
        return Response(status=200)
    else:
        return Response(status=403)

@app.route('/professor_info', methods=['GET'])
def professor_info():
    """
    A function that deals with endpoint /professor_info (GET)
    Since this is a testing function, this will return random professor information
    """

    """
    data = request.get_json()
    if data.get('id') == "test":    
        # This needs to be implemented in the future!!
        response = {"name": "정우진", "lectures": ["고급모바일실험", "운영체제", "컴퓨터구조"]}
        return Response(json.dumps(response), status=200)
    else:
        response = {"name": "", "lectures": []}
        return Response(json.dumps(response), status=200)
    """
    response = {"name": "정우진", "lectures": ["고급모바일실험", "운영체제", "컴퓨터구조"]}
    return Response(json.dumps(response), status=200)

@app.route('/lecture_list', methods=['GET'])
def lecture_list():
    """
    A function that deals with endpoint /lecture_info (GET)
    Since this is a testing function, this will return random data.
    """

    data = [{
            'name': "고급모바일실험",
            'dept': "모바일시스템공학과",
            'lectured': False,
            "students": [
                {
                    "student_name": "강형철",
                    "student_id": "32####03",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "김민주",
                    "student_id": "32####71",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "김수진",
                    "student_id": "32####99",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "김이수",
                    "student_id": "32####84",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "김준형",
                    "student_id": "32####97",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "김지용",
                    "student_id": "32####88",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "김지훈",
                    "student_id": "32####56",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "나윤진",
                    "student_id": "32####83",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "덜거르마",
                    "student_id": "32####25",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "마이클",
                    "student_id": "32####39",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                },
                {
                    "student_name": "무하마드",
                    "student_id": "32####93",
                    "department": "모바일시스템공학과",
                    "attendance": 1
                }
            ]
        },
        {
            'name': "운영체제",
            'dept': "모바일시스템공학과",
            'lectured': False,
            "students": [
                {
                    "student_name": "무하마드",
                    "student_id": "32####93",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "박근남",
                    "student_id": "32####68",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "박민주",
                    "student_id": "32####23",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "박범순",
                    "student_id": "32####15",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "박유빈",
                    "student_id": "32####80",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "박윤아",
                    "student_id": "32####68",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "백광렬",
                    "student_id": "32####67",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "서원형",
                    "student_id": "32####08",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "손보경",
                    "student_id": "32####90",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "신우재",
                    "student_id": "32####42",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "심예린",
                    "student_id": "32####98",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "양대한",
                    "student_id": "32####54",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "양윤성",
                    "student_id": "32####30",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "엄현호",
                    "student_id": "32####87",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "이라은",
                    "student_id": "32####87",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "이영주",
                    "student_id": "32####06",
                    "department": "MSE",
                    "attendance": 1
                },
                {
                    "student_name": "임석민",
                    "student_id": "32####63",
                    "department": "MSE",
                    "attendance": 1
                },
            ]
        }
        
        
        ]
        

    return Response(json.dumps(data), status=200)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)

