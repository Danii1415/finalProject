from flask import Flask
from flask_cors import CORS
import os



basedir = os.getcwd()
app = Flask(__name__)
CORS(app)


from core import router
