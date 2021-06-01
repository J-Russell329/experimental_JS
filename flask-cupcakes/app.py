"""Flask app for Cupcakes"""
from flask import Flask, jsonify, request, render_template
from models import db, connect_db, Cupcake



app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///Cupcake_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

@app.route("/")
def home_route():
    return render_template("home.html")


@app.route("/api/cupcakes")
def api_all_cupcakes():
    data_all_cupcakes = Cupcake.query.all() 
    json_data_all_cupcakes = [ cupcakes.json() for cupcakes in data_all_cupcakes]
    return jsonify( cupcakes= json_data_all_cupcakes)

@app.route("/api/cupcakes/<cupcake_id>")
def api_one_cupcake(cupcake_id):
    cupcake = Cupcake.query.get(cupcake_id)
    return jsonify(cupcake = cupcake.json())

@app.route('/api/cupcakes', methods= ["POST"])
def api_create_cupcake():
    flavor = request.json["flavor"]
    size = request.json["size"]
    rating = float(request.json["rating"])
    image =  request.json.get("image", "https://tinyurl.com/demo-cupcake")
    new_cupcake = Cupcake(flavor=flavor, size=size, rating= rating,image= image)

    db.session.add(new_cupcake)
    db.session.commit()
    # return (flavor)
    return (jsonify( cupcake= new_cupcake.json()),201)

@app.route('/api/cupcakes/<cupcake_id>', methods = ["PATCH"])
def patch_cupcake(cupcake_id):
    update_cupcake = Cupcake.query.get_or_404(cupcake_id)
    update_cupcake.flavor = request.json.get("flavor", update_cupcake.flavor)
    update_cupcake.size = request.json.get("size", update_cupcake.size)
    update_cupcake.rating = float(request.json.get("rating", update_cupcake.rating))
    update_cupcake.image = request.json.get("image", update_cupcake.image)


    db.session.add(update_cupcake)
    db.session.commit()

    return (jsonify(cupcake = update_cupcake.json()),201)

@app.route('/api/cupcakes/<cupcake_id>',methods= ["DELETE"])
def api_delete_cupcake(cupcake_id):
    num_deleted = Cupcake.query.filter(Cupcake.id==cupcake_id).delete()
    if num_deleted == 1:
        db.session.commit()
        return jsonify("deleted")
    else: 
        return jsonify("nothing was there to delete")


