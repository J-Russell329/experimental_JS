from app import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'


### why won't my cascade delete work?
# best way i found is to just drop the entire db and recreate it. then run this file



connect_db(app)
db.drop_all()
db.create_all()

db.session.add(User(first_name ="james", last_name="morse"))
db.session.add(User(first_name ="steven", last_name="tony"))
db.session.add(User(first_name ="jax", last_name="knight"))
db.session.add(User(first_name ="tom", last_name="bright"))
db.session.add(User(first_name ="candice", last_name="thompson"))

db.session.add(Post(title='first post', content='I managed to make the first post', user_id=1))

# the multiple sessions commits is to give each one a diffrent time.... 
# i know its less effecient this way but thats fine for now
db.sesion.commit()
db.session.add(Post(title='second post', content='lots of content in here', user_id=1))
db.sesion.commit()
db.session.add(Post(title='third post', content='less content', user_id=4))
db.sesion.commit()
db.session.add(Post(title='fourth post', content="great content that you can't see", user_id=4))
db.sesion.commit()
db.session.add(Post(title='fith post', content='the best content you will ever be able to find', user_id=5))
db.sesion.commit()

db.session.add(Tag(name='great post'))
db.session.add(Tag(name='bad post'))
db.session.add(Tag(name='okay post'))
db.session.add(Tag(name='badge of honnor'))

db.session.commit()

db.session.add(PostTag(post_id=5, tag_id=4))
db.session.add(PostTag(post_id=5, tag_id=1))
db.session.add(PostTag(post_id=1, tag_id=2))
db.session.add(PostTag(post_id=2, tag_id=3))
db.session.add(PostTag(post_id=4, tag_id=1))

db.session.commit()