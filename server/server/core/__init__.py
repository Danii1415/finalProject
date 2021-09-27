from flask import Flask
from flask_cors import CORS
import os



basedir = os.getcwd()
app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config['supports_credentials'] = True
app.config['CORS_SUPPORTS_CREDENTIALS'] = True

from core import router
