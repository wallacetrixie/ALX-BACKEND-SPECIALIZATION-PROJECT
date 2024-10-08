from flask import Blueprint
auth= Blueprint('auth',__name__)

@auth.route('/show')
def show():
    return "<h1>authentication<h1>"