from flask import Flask, render_template, redirect, request, flash
from models import db, connect_db,
from flask_debugtoolbar import DebugToolbarExtension



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///data_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'supersecretsecretcode'

debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()

@app.route("/")
def home():
    return 'home'


# ***********tempalte for flask app / debug toolbar / PostgreSQL link
# *************** don't forget to change the db link to your own sever name 

# typical pip programs
### required 
# flask 
# flask-debugtoolbar
# flask-sqlalchemy
# psycopg2-binary

### optional 
# ipython

# or just copy the requirements file 