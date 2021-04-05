from flask import Flask, request 
app = Flask(__name__)

@app.route('/<opperation>')
def math(opperation):
    num1 = int(request.args.get("a"))
    num2 = int(request.args.get("b"))
    if opperation == 'add':
        return  str(num1+num2)
    elif opperation == 'sub':
        return str(num1 - num2)
    elif opperation == 'mult':
        return str(num1 * num2)
    elif opperation == 'div':
        return str(num1 / num2)


@app.route('/math/<opperation>')
def more_math(opperation):
    """ duplicated under just so that the test would not give any errors"""
    num1 = int(request.args.get("a"))
    num2 = int(request.args.get("b"))
    if opperation == 'add':
        return  str(num1+num2)
    elif opperation == 'sub':
        return str(num1 - num2)
    elif opperation == 'mult':
        return str(num1 * num2)
    elif opperation == 'div':
        return str(num1 / num2)

