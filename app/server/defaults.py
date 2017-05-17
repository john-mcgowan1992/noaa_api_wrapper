# project paths and server variables
import os

DEFAULTS_PATH = os.path.abspath(__file__)
APP_ROOT = os.path.abspath(os.path.join(os.path.dirname(DEFAULTS_PATH), ".."))
CLIENT_ROOT = os.path.abspath(os.path.join(os.path.dirname(DEFAULTS_PATH), "../client/"))
PUBLIC_ROOT = os.path.abspath(os.path.join(os.path.dirname(DEFAULTS_PATH), "../client/public"))
MODULE_DIR = os.path.abspath(os.path.join(os.path.dirname(DEFAULTS_PATH), "../client/node_modules"))