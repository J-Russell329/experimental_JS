from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.fields.core import BooleanField
from wtforms.validators import AnyOf, InputRequired, Optional, NumberRange


class PetForm(FlaskForm):
    """creates a form for createing / editing pets"""

    name = StringField("Name",validators=[InputRequired()])
    species = StringField("Species",validators=[InputRequired(), AnyOf(["dog", "cat", "porcupine"],message="Species must be either cat, dog, or porcupine")])
    photo_url = StringField("Image")
    age = IntegerField("Age",validators=[NumberRange(min=0, max=30, message="Must be between ages 0-30")])
    notes = StringField("Notes")
    available = BooleanField("Available")

