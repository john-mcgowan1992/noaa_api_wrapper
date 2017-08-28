from flask import Flask
from flask import request
from flask import Response
from flask import send_from_directory
from flask import render_template
from flask import jsonify
import os.path
import requests

from defaults import API_TOKEN

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
    ENDPOINT = NOAA_ENDPOINT + "data?" + request.query_string
    try:
        api_response = requests.get(ENDPOINT, headers=headers)
        api_response.raise_for_status()
        return jsonify(api_response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"ApiError": {"type": "InvalidParameters","message": "Invalid api params."}})