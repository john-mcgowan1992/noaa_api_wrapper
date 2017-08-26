from flask import Flask
from flask import request
from flask import Response
from flask import send_from_directory
from flask import render_template
from flask import jsonify
import os.path
import requests

STATIC_RESOURCES = os.path.abspath("../client/public")
NOAA_ENDPOINT = "https://www.ncdc.noaa.gov/cdo-web/api/v2/"

headers = {"token": API_TOKEN}

app = Flask(__name__, template_folder=STATIC_RESOURCES)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/public/<path:filepath>")
def publicResources(filepath):
    return send_from_directory(STATIC_RESOURCES, filepath)

@app.route("/api/noaa/data")
def query_noaa_api():
    # ENDPOINT = NOAA_ENDPOINT + "data?" + request.query_string
    # api_response = requests.get(ENDPOINT, headers=headers)
    # print api_response
    # return jsonify(api_response.json())
    return jsonify({"hi": "dude"})


