from flask import Blueprint, request, jsonify
from config import db
from models import Post

post_router = Blueprint('post', __name__)

@post_router.route('/post', methods=['POST'])
def create_post():
    data = request.get_json()
    post = Post(content=data['content'])
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_json())


@post_router.route('/posts/<int:section_id>', methods=['GET'])
def get_posts_by_section(section_id):
    posts = Post.query.filter_by(section_id=section_id).all()
    return jsonify([post.to_json() for post in posts])
    


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