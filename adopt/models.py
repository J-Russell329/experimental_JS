from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from sqlalchemy.sql.elements import Null

from sqlalchemy.sql.schema import Index

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)



class Pet(db.Model):
    """ creates an instance of the Pet class"""

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String(50), nullable = False)
    species = db.Column(db.String(50), nullable = False)
    photo_url = db.Column(db.String, nullable = False, default = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg" )
    age = db.Column(db.Integer)
    notes = db.Column(db.String)
    available = db.Column(db.Boolean, nullable = False, default = True)
