"""Models for Blogly."""

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from sqlalchemy.sql.elements import Null
from datetime import datetime

from sqlalchemy.sql.schema import Index

db = SQLAlchemy()




class User(db.Model):
    """ creates an instance of the User class"""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    first_name = db.Column(db.String(50), nullable = False)
    last_name = db.Column(db.String(50))
    image_url = db.Column(db.String, nullable = False, default = "https://cybergisxhub.cigi.illinois.edu/wp-content/uploads/2020/10/Portrait_Placeholder.png" )

    posts = db.relationship('Post', backref ='users', cascade="all, delete-orphan")

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
    created_at = db.Column(db.DateTime, nullable = False, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # def __init__(self, **rest):
    #     self.created_at = datetime.now()
    #     try:
    #         self.title = rest["title"]
    #         self.content = rest["content"]
    #         self.user_id = rest["user_id"]
    #     except:
    #         raise ValueError('a post requires a title and content.')
        
    
    def __repr__(self):
        return f"<Post: id:{self.id}, Title:{self.title}>"
 
class PostTag(db.Model):
    """
    Creates a class instance that connects the Posts table to the Tags table
    """ 

    __tablename__ = "post_tags"

    # id = db.Column(db.Integer, primary_key = True)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)


    # def __repr__(self):
    #     return f"<Post_Tag: id:{self.id}, Post_id: {self.post_id}, tag_id:{self.tag_id}>"

class Tag(db.Model):
    """
    Creates an instance of the tags table. holds the infomation of
    the available tags
    """

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    name = db.Column(db.String, nullable=False, unique=True)



    ### notes: i guess this syntax doesn't work. can't have multiple back refs laid out in this way
    ### why is this line of code breaking my app?
    # posts = db.relationship('Post', backref ='tags')

    # post_tags = db.relationship('PostTag', backref ='tags')

    ### notes: this is the proper syntax for having multiple back refs... i guess... not sure what the diffrence is
    posts = db.relationship(
            'Post',
            secondary="post_tags",
            cascade="all,delete",
            backref="tags",
        )

    def __repr__(self):
        return f"<Tag: id:{self.id}, name: {self.name}>"

tag_name_index = Index(Tag.name)    

def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)


#  my code ^
###################################################
# springboard code 

# """SQLAlchemy models for blogly."""

# import datetime
# from flask_sqlalchemy import SQLAlchemy

# db = SQLAlchemy()

# DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"


# class User(db.Model):
#     """Site user."""

#     __tablename__ = "users"

#     id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.Text, nullable=False)
#     last_name = db.Column(db.Text, nullable=False)
#     image_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)

#     posts = db.relationship("Post", backref="user", cascade="all, delete-orphan")

#     @property
#     def full_name(self):
#         """Return full name of user."""

#         return f"{self.first_name} {self.last_name}"


# class Post(db.Model):
#     """Blog post."""

#     __tablename__ = "posts"

#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.Text, nullable=False)
#     content = db.Column(db.Text, nullable=False)
#     created_at = db.Column(
#         db.DateTime,
#         nullable=False,
#         default=datetime.datetime.now)
#     user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

#     @property
#     def friendly_date(self):
#         """Return nicely-formatted date."""

#         return self.created_at.strftime("%a %b %-d  %Y, %-I:%M %p")


# class PostTag(db.Model):
#     """Tag on a post."""

#     __tablename__ = "posts_tags"

#     post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), primary_key=True)
#     tag_id = db.Column(db.Integer, db.ForeignKey('tags.id'), primary_key=True)


# class Tag(db.Model):
#     """Tag that can be added to posts."""

#     __tablename__ = 'tags'

#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.Text, nullable=False, unique=True)

#     posts = db.relationship(
#         'Post',
#         secondary="posts_tags",
#         # cascade="all,delete",
#         backref="tags",
#     )


# def connect_db(app):
#     """Connect this database to provided Flask app.

#     You should call this in your Flask app.
#     """

#     db.app = app
#     db.init_app(app)
