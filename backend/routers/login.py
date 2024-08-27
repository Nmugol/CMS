from flask import Blueprint, request, jsonify
from config import db
import jwt

SECRET = '44ffb6f3ba6b4a2dd0dd70e96bd6a2a859e17a1c8821a8a56519a4f3d4bdf803'

login_router = Blueprint('login', __name__)

LOGIN = 'admin'
PASSWORD = 'admin'

correctToken = jwt.encode({'login': LOGIN, 'password': PASSWORD}, SECRET, algorithm='HS256')

@login_router.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    token = jwt.encode(data, SECRET, algorithm='HS256')

    if token == correctToken:
        return jsonify({'token': token}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401
