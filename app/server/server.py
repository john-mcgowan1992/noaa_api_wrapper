from flask import Flask
from flask import request
from flask import Response
from flask import send_from_directory
from flask import render_template
from flask import jsonify
import os.path

STATIC_RESOURCES = os.path.abspath("../client/public")

app = Flask(__name__, template_folder=STATIC_RESOURCES)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/public/<path:filepath>")
def publicResources(filepath):
    return send_from_directory(STATIC_RESOURCES, filepath)

