
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
import netifaces
# from time import sleep
import signal

app = Flask(__name__,  static_folder='build')
api = Api(app)
CORS(app)

# utils

def get_desk_hostname():
    try:
        with open("/media/usb/settings.json", "r") as f:
            settings = json.loads(f.read())
            return settings["host_name"]
    except:
        return "usb-not-found"

def get_desk_id():
    try:
        with open("/media/usb/settings.json", "r") as f:
            settings = json.loads(f.read())
        return settings["datastore_id"]
    except:
        return "usb-not-found"

def get_ipaddresses():
    adapters = netifaces.interfaces()
    addresses = []
    for adapter in adapters:
        if adapter in ('eth0','wlan0'):
            mac_addr = netifaces.ifaddresses(adapter)[netifaces.AF_LINK][0]['addr']
            try:
                ip_addr = netifaces.ifaddresses(adapter)[netifaces.AF_INET][0]['addr']
            except:
                ip_addr = 'disconnected'
            #print(mac_addr, ip_addr)
            addresses.append((adapter,mac_addr,ip_addr))
    return(addresses)


# serve the React(tsx) app

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists("build/" + path):
        return send_from_directory('build/', path)
    else:
        return send_from_directory('build/', 'index.html')

# API endpoints

class Test(Resource):
    def get(self):
        print('You\'re testing, you think?')

class Info(Resource):
    def get(self):
        return jsonify([get_desk_hostname(), get_desk_id(), get_ipaddresses()])


# URLs are defined here

api.add_resource(Test, '/test')
api.add_resource(Info, '/info')

if __name__ == '__main__':
   app.run(debug=False, port=80, host='0.0.0.0', use_reloader=True)
