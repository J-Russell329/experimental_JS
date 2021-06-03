from flask import Flask, render_template, redirect, request, flash, session
from wtforms import form
from models import db, connect_db, User, FeedBack
from flask_debugtoolbar import DebugToolbarExtension
from forms import UserForm, UserLogin, FeedBackForm



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///feedback_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'supersecretsecretcode'

debug = DebugToolbarExtension(app)

connect_db(app)
db.create_all()




@app.route("/")
def home():
    return redirect("/register")

@app.route("/register", methods=["POST","GET"])
def register():
    form = UserForm()
    if form.validate_on_submit():
        print("validating............")
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']
        first_name = request.form['first_name']
        last_name = request.form['username']

        new_user = User.register(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name
            )

        db.session.add(new_user)
        db.session.commit()
        session["username"] = new_user.username
        return redirect('/secret')


    return render_template("register.html", form=form)

@app.route("/login", methods= ["GET", "POST"])
def login_route():
    form = UserLogin()
    if form.validate_on_submit():
        login_user = User.query.filter(User.username == request.form["username"]).first()
        if login_user.authenticate(request.form["username"],request.form["password"]):
            session["username"] = login_user.username
            return redirect("/secret")

        else:
            flash("invalid username / password")
            return redirect("/login")


    
    return render_template("login.html", form= form)

@app.route("/secret")
def secret():
    if 'username' in session:
        return render_template("secret.html")

    else:
        flash("must be loged in to view")
        return redirect("/login")


@app.route("/logout", methods = ["POST"])
def logout_route():
    print("***********************")
    # print(session["username"])
    session.pop("username",None)
    return redirect('/login')

@app.route("/users/<username>")
def user_page(username):
    user = User.query.filter(User.username== username).first()

    if not user == None:
        return render_template("username_route.html", user= user, feedback = user.feedback)
    else:
        flash("no user was found")
        return redirect("/register")

@app.route("/users/<username>/feedback/add", methods=["POST", "GET"])
def feedback_add_route(username):

    form = FeedBackForm()
    if "username" not in session:
        flash("you have to be loged in to post feedback")
        return redirect('/login')

    if not session["username"] == username:
        flash("you can't post feedback on behalf of another user")
        return redirect(f'/users/{session["username"]}/feedback/add')


    if form.validate_on_submit():
        new_feedback = FeedBack(
            title= request.form["title"],
            content= request.form["content"],
            username= session["username"]

            )
        db.session.add(new_feedback)
        db.session.commit()
        return redirect(f"/users/{username}")
    return render_template("register.html", form = form)

@app.route('/users/<username>/delete', methods =["POST"])
def delete_user(username):

    if "username" not in session:
        flash("must be loged in or sign up")
        return redirect(f'/register')
    else:
        user_profile = User.query.get(username)



    if not session["username"] == user_profile.username:
        flash("you can't delete another persons profile")
        return redirect(f'/users/{session["username"]}')
    else:
        db.session.delete(user_profile)
        db.session.commit()

    flash("your profile has been deleted")
    return redirect('/')


@app.route("/feedback/<post_id>/update", methods= ["POST","GET"])
def update_feedback(post_id):
    old_feedback = FeedBack.query.get(post_id)
    form = FeedBackForm(obj=old_feedback)

    if not session["username"] == old_feedback.username:
        flash("you can't post feedback on behalf of another user")
        return redirect(f'/users/{session["username"]}')

    if form.validate_on_submit():
        old_feedback.title = request.form.get("title", old_feedback.title)
        old_feedback.content = request.form.get("content", old_feedback.content)
        old_feedback.username = old_feedback.username
        db.session.add(old_feedback)
        db.session.commit()
        return redirect(f"/users/{old_feedback.username}")
    return render_template('register.html', form=form)

@app.route("/feedback/<post_id>/delete", methods = ["POST"])
def delete_feedback(post_id):
    del_feed = FeedBack.query.filter( FeedBack.id==post_id).first()
    if del_feed:
        db.session.delete(del_feed)
        db.session.commit()
        flash(f"Deleted {del_feed.title}")
        return redirect(f'/users/{del_feed.username}')
    flash("couldn't find anything to delete ")
    return redirect(f'/') 