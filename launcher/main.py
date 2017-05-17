# micro service to query NOAA's climate date API

import time
import sys
import random

import urllib
import httplib
import requests
import webbrowser
import json

import launcher_defaults

# user information
USER_NAME = launcher_defaults.USER_NAME

# request variables
noaa_url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/"
noaa_token = launcher_defaults.noaa_token
headers = {"token": noaa_token}
noaa_enpoints = ["datasets"]

# cli interface prompts
PROMPT = "|*|>>> "
fallback_init = ["Will you be using the command line, or the GUI today?"]
bot_init = ["Hi there! I'm climateBot"] + fallback_init
bot_cli_flow = ["Okay, command line it is!", "Can I make a request for you?"]
bot_gui_flow = ["Okay, graphical interface it is!", "Climate bot's graphical component runs in your favorite browswers!", "Would you like to launch the graphical component in your default browser?"]
unhandled_response = ["I'm sorry, I didn't quite get that!"]
termination_prompt = ["Oh well, I tried...", "Carry along with your day."]

#cli handled responses
affirmatives = ["yes", "ye", "y", "sure", "okay", "ok"]
negatives = ["no", "n", "nope", "nop"]
cli_or_gui = [["command", "command line", "c", "cl", "cli"], ["g", "gu", "gui", "graphic", "graphical", "graphical user interface"]]


HELP_GUIDE = "NOAA climate bot is a user-friendly wrapper for the National Oceanic and Atmospheric Association's API that allows curious individuals to more easily obtain data for NOAA's wide breadth of climate data."

def slow_print(str_ls, rate=10):
    newLn = "\n"
    str = newLn.join(str_ls)
    str+="\n"
    for l in str:
        sys.stdout.write(l)
        sys.stdout.flush()
        time.sleep((random.uniform(0, 1)/rate))


def main(init=bot_init, cached_question=None):
    if cached_question == None:
        slow_print(init, 15)
        q = raw_input(PROMPT)
        if q.lower() in cli_or_gui[0]:
            slow_print(bot_cli_flow, 15)
            cli_input = raw_input(PROMPT)
            # run cli control handler
            cli_control_handler(cli_input)
        elif q.lower() in cli_or_gui[1]:
            slow_print(bot_gui_flow, 15)
            gui_input = raw_input(PROMPT)
            # run gui control handler
            gui_control_handler(gui_input)
        else:
            # rerun main() with fallback
            main(unhandled_response + fallback_init)
    else:
        slow_print(init)
        slow_print(cached_question)
        fallback_input = raw_input(PROMPT)
        # run cli control handler with input
        if cached_question is bot_cli_flow:
            cli_control_handler(fallback_input)
        elif cached_question is bot_gui_flow:
            gui_control_handler(fallback_input)
        else:
            slow_print(["Error: climate bot is terminating"])

def cli_control_handler(input):
    if input.lower() in affirmatives:
        slow_print(["Very well", "Request is on the way!"], 15)
        r = requests.get(noaa_url + "datasets", headers=headers)
        print r.json()
        # parsed = json.loads(r)
        # response_handler(parsed)
    elif input.lower() in negatives:
        slow_print(termination_prompt, 25)
    else:
        main(unhandled_response, bot_cli_flow)

def gui_control_handler(input):
    if input.lower() in affirmatives:
        slow_print(["Very well.", "I'll spin up the application in your default browser", "My work here is done...", "Farewell, %s" % USER_NAME], 12)
        webbrowser.open("http://www.noaa.gov", new=1, autoraise=True)
        return None
    elif input.lower() in negatives:
        slow_print(termination_prompt)
        return None
    else:
        main(unhandled_response, bot_gui_flow)

def response_handler(res):
    list = []
    for item in res:
        list.append(item.uid)
    print list

def rawInputHandler(expectedAnswers, actionHandlers):
    helpInput = ["help", "--help", "-help"]
    exitInput = ["exi", "exit", "qui", "quit"]
    userInput = raw_input(PROMPT)
    if userInput.lower() in helpInput:
        print HELP_GUIDE
    elif userInput.lower() in exitInput:
        slow_print(["Quitting NOAA climate bot", "Good bye!"])
        return None
    elif userInput.lower() in expectedAnswers:
        # respond to expected answers
        return

def request_wrapper(url=noaa_url, endpoint="datasets", headers=headers):
    r = requests.get(url + endpoint, headers=headers)

# run
main()
