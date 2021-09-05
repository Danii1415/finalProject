from flask import Flask
from flask_cors import CORS
import os



basedir = os.getcwd()
app = Flask(__name__)
#CORS(app)
#CORS(app, allow_headers=['Content-Type', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers', 'Access-Control-Allow-Methods'])
#cors = CORS(app, resources={r"/*": {"origins": "*"}})
CORS(app, resources={r"/*": {"origins": "*"}})
#app.config['CORS_HEADERS'] = 'Content-Type'
app.config['supports_credentials'] = True
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

from core import router
