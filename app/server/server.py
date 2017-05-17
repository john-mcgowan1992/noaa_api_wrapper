from flask import Flask
from flask import request
from flask import render_template
from flask import send_from_directory

from defaults import APP_ROOT, CLIENT_ROOT, PUBLIC_ROOT, MODULE_DIR

app = Flask(__name__, template_folder=PUBLIC_ROOT)

@app.route("/node_modules/<path:filepath>")
def serveModules(filepath):
    return send_from_directory(MODULE_DIR, filepath)

@app.route("/src/<path:filepath>")
def serveComponents(filepath):
    return send_from_directory(CLIENT_ROOT, filepath)

@app.route('/')
def index():
    return render_template("index.html")