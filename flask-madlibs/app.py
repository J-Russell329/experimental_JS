from logging import debug
from flask import Flask, request, template_rendered
from flask.templating import render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import * 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

debug = DebugToolbarExtension(app)

@app.route('/')
def home():
    prompts = story.prompts
    return render_template("home.html", prompts=prompts)

@app.route('/story')
def display_story():
    text = story.generate(request.args)
    return render_template('story.html',text=text)

@app.route('/create-a-story')
def story_create():
    return render_template('create_a_story.html')

@app.route("/personal-story-fill-in-blank")
def create_personal_story(): 
    personal_story = Story(list(eval(request.args.get('blanks'))),(request.args.get('text')))
    personal_prompts = personal_story.prompts
    return render_template('personal-story-fill-in-blank.html',personal_prompts=personal_prompts)

@app.route('/personal-story')
def personal_story():
    # personal_story_full = personal_story.generate(request.args)
    return render_template('personal-story.html',)
