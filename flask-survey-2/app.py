from flask import Flask , render_template, request, redirect, url_for, flash
from surveys import * 
from flask_debugtoolbar import DebugToolbarExtension


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'

debug = DebugToolbarExtension(app)

answers = []

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/question/<int:question_number>')
def question(question_number):
    # temp_answer = list(request.args)
    # if len(temp_answer)>0:
    #     answers.append(temp_answer[0])
    try:
        question = satisfaction_survey.questions[question_number].question
        choices = satisfaction_survey.questions[question_number].choices
        if question_number == len(answers):
             return render_template('question.html',question=question,next_number= question_number+1,choices=choices)
        else:   
            return redirect(f'/question/{len(answers)}')
    except:
        if question_number == len(answers):
            return render_template('thank-you.html',answers=answers) 
        else:
            flash('stop trying to do questions out of order')
            return redirect(f'/question/{len(answers)}')

@app.route('/question/send')
def send_data():
    temp_answer = list(request.args)
    if len(temp_answer)>0:
        answers.append(temp_answer[0])
    return redirect(f'/question/{len(answers)}')
