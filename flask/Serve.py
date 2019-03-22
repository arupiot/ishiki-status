
#!/usr/bin/env python3

from flask import Flask, request, send_from_directory, render_template
from flask_cors import CORS, cross_origin 
from flask_restful import Resource, Api
from json import dumps
from flask_jsonpify import jsonify
from flask_restful import reqparse
from time import ctime


from os.path import splitext
import os 
import os.path
import sys
import time
import subprocess
import json
import random
from pathlib import Path
# from time import sleep
import signal

mpegOnly = True
mlpOnly = False
allFormats = False
useNTP = False

app = Flask(__name__,  static_folder='static')
api = Api(app)

# serve the angular app

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("static/" + path):
        return send_from_directory('static/', path)
    else:
        return send_from_directory('static/', 'index.html')

# API endpoints

class Test(Resource):
    def get(self):
        print('You\'re testing, you think?')


# URLs are defined here

api.add_resource(Test, '/test')

if __name__ == '__main__':
   app.run(debug=False, port=80, host='0.0.0.0', use_reloader=True)
