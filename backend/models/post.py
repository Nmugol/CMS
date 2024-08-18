from config import db

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)

    def __init__(self, content):
        self.content = content  

    def to_json(self):
        return {
            'id': self.id,
            'content': self.content
        }