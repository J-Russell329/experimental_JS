from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField,PasswordField
from wtforms.fields.core import BooleanField
from wtforms.validators import AnyOf, InputRequired, Optional, NumberRange, Email, Length


class User(FlaskForm):
    """creates a form for createing / editing"""

    email = StringField("email",validators=[InputRequired(), Email()])
    first_name = StringField("first_name", validators = [InputRequired(), Length(max = 30) ] )
    last_name = StringField("last_name", validators = [InputRequired(), Length(max = 30) ] )
    username = StringField("Name",validators=[InputRequired()])
    password= PasswordField("Password",validators=[InputRequired()])



