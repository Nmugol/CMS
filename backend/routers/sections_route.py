from flask import Blueprint, request, jsonify
from config import db
from models import Section

section_router = Blueprint('section', __name__)


@section_router.route('/section', methods=['GET'])
def get_sections():
    sections = Section.query.all()
    return jsonify([section.to_json() for section in sections])


@section_router.route('/section', methods=['POST'])
def create_section():

    data = request.get_json()
    print(data)
    section = Section(name=data['name'])
    db.session.add(section)
    db.session.commit()
    return jsonify(section.to_json())


@section_router.route('/section/<int:id>', methods=['PUT'])
def update_section(id):
    section = Section.query.get(id)
    if not section:
        return jsonify({'message': 'Section not found'}), 404
    data = request.get_json()
    section.name = data['name']
    db.session.commit()
    return jsonify(section.to_json())


@section_router.route('/section/<int:id>', methods=['DELETE'])
def delete_section(id):
    section = Section.query.get(id)
    if not section:
        return jsonify({'message': 'Section not found'}), 404
    db.session.delete(section)
    db.session.commit()
    return jsonify({'message': 'Section deleted'})