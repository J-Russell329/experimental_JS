from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)



class User(db.Model):
    """ creates an instance of the User class"""

    __tablename__ = "users"

    username = db.Column(db.String(20), primary_key = True, )
    password = db.Column(db.String, nullable = False)
    email = db.Column(db.String(50), nullable = False)
    first_name = db.Column(db.String(30), nullable = False)
    last_name = db.Column(db.String(30), nullable = False)


    @classmethod
    def register(cls,username, password,email,first_name,last_name):
    
        hashed= bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")

        return cls(
            username= username,
            password = hashed_utf8,
            email= email,
            first_name= first_name,
            last_name = last_name
            )

    @classmethod
    def authenticate(cls, username, pwd):
        """Validate that user exists & password is correct.

        Return user if valid; else return False.
        """

        u = User.query.filter_by(username=username).first()

        # print(u)
        if u and bcrypt.check_password_hash(u.password, pwd):
            # return user instance
            return u
        else:
            return False

class FeedBack(db.Model):
    """creates and instance of the feedback class"""

    __tablename__ = "feedback"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column(db.String(100), nullable = False)
    content = db.Column(db.String, nullable = False)
    username = db.Column(db.String, db.ForeignKey('users.username'))

    users = db.relationship(
        "User",
        
        backref=backref("feedback",cascade="all, delete-orphan", order_by='FeedBack.id.desc()')
    )