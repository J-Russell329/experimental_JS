from types import MethodType
from flask import Flask , render_template, request, redirect, url_for, flash
from flask.globals import session
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

debug = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def game_board():
    # ************************
    # temp game board 
    # game_board = 	[['C', 'K', 'P', 'L', 'H'], ['A', 'R', 'W', 'E', 'J'], ['T', 'W', 'R', 'W', 'H'], ['Y', 'K', 'U', 'M', 'C'], ['U', 'V', 'K', 'C', 'T']]
    game_board = boggle_game.make_board()
    session['game_board'] = game_board
    return render_template('boggle-game.html', game_board=game_board)

@app.route('/test-word', methods=['POST'])
def test_word_function():
    try: 
        test_word = request.form["word"]
    except:
        test_word = "app.py: nope, request.form['word'] was not found"
    word_results = boggle_game.check_valid_word(session['game_board'],test_word)
    return word_results

# @app.route('/test', methods=['POST', 'GET'])
# def test_route():
#     if request.method == 'GET':
#         session['test'] = 'testing with sessions'
#         return render_template('test.html')
#     else:
#         test = session['test']
#         return test
    