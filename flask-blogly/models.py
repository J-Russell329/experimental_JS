"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.elements import Null

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)

class User(db.Model):
    """ creates an instance of the User class"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50))
    image_url = db.Column(db.String, nullable = False, default = "https://cybergisxhub.cigi.illinois.edu/wp-content/uploads/2020/10/Portrait_Placeholder.png" )

    def __repr__(self):
            return f"<User name: {self.get_full_name()} id: {self.id}>"

    def get_full_name(self):
        if self.last_name:
            last = ' ' + self.last_name
        else:
            last = ''
        return f"{self.first_name}{last}"

