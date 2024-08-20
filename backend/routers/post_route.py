from flask import Blueprint, request, jsonify
from config import db
from models import Post
from models import Section

post_router = Blueprint('post', __name__)

@post_router.route('/post', methods=['POST'])
def create_post():
    data = request.get_json()
    post = Post(content=data['content'], section_id=data['section_id'])
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_json())


@post_router.route('/post/<int:id>', methods=['GET'])
def get_post(id):
    section = Section.query.get(id)
    if not section:
        return jsonify({'message': 'Section not found'}), 404
    posts = section.posts
    result = []
    for post in posts:
        result.append(post.to_json())
    return jsonify(result)


@post_router.route('/post/<int:id>', methods=['PUT'])
def update_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404
    data = request.get_json()
    post.content = data['content']
    db.session.commit()
    return jsonify(post.to_json())


@post_router.route('/post/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({'message': 'Post not found'}), 404
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'})