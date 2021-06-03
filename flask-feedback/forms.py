from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.fields.simple import TextAreaField
from wtforms.validators import InputRequired,  Email, Length


class UserForm(FlaskForm):
    """creates a form for createing / editing"""

    email = StringField("Email",validators=[InputRequired(message="Email is required"), Email(message="Must be a valid email") ])
    first_name = StringField("First Name", validators = [InputRequired(), Length(max = 30) ] )
    last_name = StringField("Last Name", validators = [InputRequired(), Length(max = 30) ] )
    username = StringField("User Name",validators=[InputRequired()])
    password= PasswordField("Password",validators=[InputRequired()])


class UserLogin(FlaskForm):
    username = StringField("User Name",validators=[InputRequired()])
    password= PasswordField("Password",validators=[InputRequired()])


class FeedBackForm(FlaskForm):
    title = StringField("Title", validators=[InputRequired()])
    content = TextAreaField("Content", validators=[InputRequired()])