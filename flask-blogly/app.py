"""Blogly application."""

from flask import Flask, render_template, redirect, request, flash
from models import db, connect_db, User, Post
from flask_debugtoolbar import DebugToolbarExtension
from clean_code_app import *
from datetime import datetime





app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'secret'

debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()


@app.route('/')
def home():
    return redirect('/users')
    

@app.route('/users')
def all_users():
    data = User.query.order_by(User.first_name.asc(),User.last_name.asc()).limit(25).all()
    return render_template('home.html', data=data )

@app.route('/users/new', methods = ['POST', 'GET'])
def new_user():
    if request.method == 'GET':
        return render_template('new-user.html')
    if request.method == 'POST':
        pre_new_user = is_good_user(request.form['first_name'],request.form['last_name'],request.form['image_url'])
        
        if type(pre_new_user) == type(''):
            flash(f'{pre_new_user}')
            return redirect('/users/new')

        new_user = User(
            first_name = pre_new_user[0],
            last_name = pre_new_user[1],
            image_url = pre_new_user[2]
        )

        db.session.add(new_user)
        db.session.commit()
        # return render_template('new-user.html')
        try:
            return redirect(f'/users/{new_user.id}')
        except:
            flash('whoops. couldnt find the new user')
            return redirect('/')


@app.route('/users/<user_id>')
def user_page(user_id):
    data = User.query.get(user_id)
    return render_template('user-page.html', user = data)

@app.route('/users/<user_id>/edit', methods = ["POST", "GET"])
def update_page(user_id):

    if request.method == "GET":
        data = User.query.get(user_id)
        return render_template('update-page.html', user = data)

    if request.method == "POST":

        pre_edit_user = is_good_user(request.form['first_name'],request.form['last_name'],request.form['image_url'])
        
        if type(pre_edit_user) == type(''):
            flash(f'{pre_edit_user}')
            return redirect(f'/users/{user_id}/edit')

        user_data = User.query.get(user_id)
        user_data.first_name = pre_edit_user[0]
        user_data.last_name = pre_edit_user[1]
        user_data.image_url = pre_edit_user[2]
        db.session.add(user_data)
        db.session.commit()

        return redirect(f'/users/{user_id}')


@app.route('/users/<user_id>/delete', methods = ["POST"])
def delete_page(user_id):
    User.query.filter_by(id=user_id).delete()
    db.session.commit()
    flash(f'user has been deleted (id:{user_id})')
    return redirect('/')

@app.route('/users/<user_id>/posts/new', methods = ['POST','GET'])
def  new_user_post(user_id):

    if request.method == 'GET':
        data_user = User.query.get(user_id)
        return render_template('new-post-form.html', user = data_user)

    if request.method == 'POST':
        pre_post = is_good_post(request.form['title'],request.form['content'])

        if type(pre_post) == type(''):
            flash(f'{pre_post}')
            return redirect(f'/users/{user_id}/posts/new')

        data_post = Post(
            title = pre_post[0],
            content = pre_post[1],
            user_id = int(user_id)
            )
        
        db.session.add(data_post)
        db.session.commit()
        
        post_id = data_post.id
        return redirect(f'/posts/{post_id}/')

@app.route('/posts/<post_id>')
def post_route(post_id):
    data_post = Post.query.get(post_id)
    return render_template('post-page.html', post = data_post)
