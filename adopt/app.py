from flask import Flask, render_template, redirect, request, flash
from sqlalchemy.sql.elements import Null
from models import db, connect_db, Pet
from flask_debugtoolbar import DebugToolbarExtension
from forms import PetForm





app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'supersecretsecretcode'

debug = DebugToolbarExtension(app)

connect_db(app)

@app.route("/")
def home():
    data_all_pets = Pet.query.all()
    return render_template('home.html', pets= data_all_pets)

@app.route('/pets/<pet_id>')
def pets_route(pet_id):
    data_pet = Pet.query.get_or_404(pet_id)
    return render_template("pet-info.html", pet= data_pet)

@app.route("/add", methods= ["get", "post"])
def add_pets_route():
    form= PetForm()
    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        if form.photo_url.data:
            photo_url = form.photo_url.data
        else: 
            photo_url = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
        age = form.age.data
        notes = form.notes.data
        available = bool(form.available.data)


        db.session.add(Pet(name= name, species=species, photo_url = photo_url, age=age,notes=notes, available=available))
        db.session.commit()
        flash(f"Added {name},({species}) has been added")
        return redirect("/")

    else:
        return render_template(
            "new-pets.html", form=form)

@app.route('/pets/<pet_id>/edit', methods= ["POST", "GET"])
def pet_edit_route(pet_id):

    data_pet = Pet.query.get_or_404(pet_id)
    form = PetForm(obj=data_pet)

    if form.validate_on_submit():
        name = form.name.data
        species = form.species.data
        if form.photo_url.data:
            photo_url = form.photo_url.data
        else: 
            photo_url = 'https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
        age = form.age.data
        notes = form.notes.data
        available = form.available.data


        data_pet.name= name
        data_pet.species=species
        data_pet.photo_url = photo_url
        data_pet.age=age
        data_pet.notes=notes
        data_pet.available=available
        db.session.add(data_pet)
        db.session.commit()
        flash(f"updated {name},({species})")
        return redirect("/")

    else:
        return render_template(
            "new-pets.html", form=form)