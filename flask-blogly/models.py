"""Models for Blogly."""

import threading
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from sqlalchemy.sql.elements import Null
from datetime import datetime

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

    posts = db.relationship('Post', backref ='users')

    def __repr__(self):
            return f"<User name: {self.get_full_name()} id: {self.id}>"

    def get_full_name(self):
        if self.last_name:
            last = ' ' + str.capitalize(self.last_name)
        else:
            last = ''
        return f"{str.capitalize(self.first_name)}{last}"

class Post(db.Model):
    """
    creates an instance of the Posts SQL class
    This is where we store the posts created by each user and create a relation between the User class and Post class
    """

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    title = db.Column(db.String(50), nullable = False)
    content = db.Column(db.String(5000), nullable = False)
    created_at = db.Column(db.DateTime, nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
        
    
    def __repr__(self):
        return f"<Post: id:{self.id}, Title:{self.title}>"
 
class Tag(db.Model):
    """
    Creates an instance of the tags table. holds the infomation of
    the available tags
    """

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String, nullable = False, unique = True)

    posts = db.relationship('Post', backref ='tags')
    post_tags = db.relationship('posts_tags', backref ='tags')

    def __repr__(self):
        return f"<Tag: id:{self.id}, name: {self.name}>"

class PostTag(db.Model):
    """
    Creates a class instance that connects the Posts table to the Tags table
    """ 

    __tablename__ = "post_tags"

    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)


    def __repr__(self):
        return f"<Post_Tag: id:{self.id}, Post_id: {self.post_id}, tag_id:{self.tag_id}>"
