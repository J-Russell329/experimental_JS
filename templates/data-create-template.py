from app import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///data_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'supersecretsecretcode'


connect_db(app)
db.drop_all()
db.create_all()



class Model(db.Model):
    """ creates an instance of the ____ class"""

    __tablename__ = "_____"

    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    