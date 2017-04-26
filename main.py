# micro service to query climate data api and compare data over certain time periods!
#
######### OBJECTIVES:
#           1. start small
#           2. don't get discouraged
#           3. get HTTP request going!
import time
import sys
import random

import urllib
import httplib
import requests
import json

noaa_token = "PhqMiAyhhGyHvvGPmMUQkXISabibwfEr"
noaa_url = "https://www.ncdc.noaa.gov/cdo-web/api/v2/"
headers = {"token": noaa_token}
noaa_enpoints = ["datasets"]

# cli interface stuff
bot_init = ["Hi there! I'm climateBot", "Will you be using the command line, or the GUI today?"]
cli_or_gui = [["command", "command line", "c", "cl", "cli"], ["g", "gu", "gui", "graphic", "graphical", "graphical user interface"]]
bot_cli_flow = ["Okay, command line it is!", "Can I make a request for you?"]
bot_gui_flow = ["Hmm so you want to use the web browser?", "Let's go!"]
affirmatives = ["yes", "ye", "y", "sure", "okay", "ok"]
negatives = ["no", "n", "nope", "nop"]

HELP_GUIDE = "NOAA climate bot is a user-friendly wrapper for the National Oceanic and Atmospheric Association's API that allows curious individuals to more easily obtain data for NOAA's wide breadth of climate data."

PROMPT = "|*|>>> "

def slowPrint(str_ls, rate=10):
    newLn = "\n"
    str = newLn.join(str_ls)
    str+="\n"
    for l in str:
        sys.stdout.write(l)
        sys.stdout.flush()
        time.sleep((random.uniform(0, 1)/rate))


def main(init=bot_init):
    slowPrint(init, 15)
    q = raw_input(PROMPT)
    if q.lower() in cli_or_gui[0]:
        slowPrint(bot_cli_flow, 15)
        cli_input = raw_input(PROMPT)
        if cli_input.lower() in affirmatives:
            slowPrint(["Yeehaaawwww", "Request is on the way!"], 15)
            r = requests.get(noaa_url + "datasets", headers=headers)
            print r.json()
            # parsed = json.loads(r)
            # responseHandler(parsed)
        elif cli_input.lower() in negatives:
            slowPrint(["Oh well I tried...", "Carry along with your day."], 25)
    elif q.lower() in cli_or_gui[1]:
        # do something
        slowPrint(bot_gui_flow, 15)
        gui_input = raw_input(PROMPT)
    else:
        slowPrint(["I'm sorry, I didn't quite get that!", "Please try again"])
        main(["Would you like to see some data!?!?"])

def responseHandler(res):
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
        slowPrint(["Quitting NOAA climate bot", "Good bye!"])
        return None
    elif userInput.lower() in expectedAnswers:
        # respond to expected answers
        return

def requestWrapper(url=noaa_url, endpoint="datasets", headers=headers):
    r = requests.get(url + endpoint, headers=headers)

# Run it!!!
main()
