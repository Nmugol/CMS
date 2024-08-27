from config import app, db
from models import Post, Section
from routers  import section_router, post_router, login_router

app.register_blueprint(section_router)
app.register_blueprint(post_router)
app.register_blueprint(login_router)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        db.session.commit()
    app.run(debug=True)