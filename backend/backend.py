import os
from flask import Flask, flash, request, redirect, url_for, Response
app = Flask(__name__)


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

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)