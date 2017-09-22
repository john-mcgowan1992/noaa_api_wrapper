import { combineReducers } from 'redux';
import { REQUEST_API_DATA, RECEIVE_API_DATA, SET_QUERY_PARAMETERS, TOGGLE_NAVBAR, ADD_SAVED_WEATHER_STATION, ADD_MAP_QUERY } from '../actions/index';

function response_data(
    state= {
        isFetching: false,
        data: []
    },
    action
) {
    switch(action.type) {
        case REQUEST_API_DATA:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_API_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data
            });
        default:
            return state;
    }
}

function queryParameters(
    state= {
        datasetid: "",
        startdate: "",
        enddate: "",
        locationid: "",
        datacategoryid: "",
        units: "standard"
    },
    action
) {
    switch(action.type) {
        case SET_QUERY_PARAMETERS:
            return Object.assign({}, state, action.queryParameters)
        default:
            return state
    }
}

function queriesById(state={}, action) {
    switch(action.type) {
        case ADD_MAP_QUERY:
            if (state[action.id]) {
                return state
            }
            else {
                return {
                    ...state,
                    [ action.id ]: {
                        stationIds: []
                    }
                }
            }
        case ADD_SAVED_WEATHER_STATION:
            const query = state[action.queryKey]
            return {
                ...state,
                [ action.queryKey ]: {
                    stationIds: [
                        ...query.stationIds,
                        action.station.id
                    ]
                }
            }
        default:
            return state
    }
}

function allQueries(state=[], action) {
    switch(action.type) {
        case ADD_MAP_QUERY:
            if (state.indexOf(action.id) > -1) {
                return state
            }
            else {
                return [
                    ...state,
                    action.id
                ]
            }
        default:
            return state
    }
}

const mapQueries = combineReducers({
    byId: queriesById,
    allIds: allQueries
})

function savedStations(
    state={
        stationList: [],
        stations: {
            byId: {},
            ids: []
        }
    },
    action
) {
    switch(action.type) {
        case ADD_SAVED_WEATHER_STATION:
            return Object.assign({}, state, {
                stationList: [
                        ...state.stationList,
                        action.station
                    ],
                stations: {
                    byId: {
                        ...state.stations.byId,
                        [ action.station.id ]: {
                            ...action.station
                        }
                    },
                    ids: [
                        ...state.stations.ids,
                        action.station.id
                    ]
                }
            })
        default:
            return state;
    }
}

function uiState(
    state={
        showNavbar: true
    },
    action
) {
    switch(action.type) {
        case TOGGLE_NAVBAR:
            return Object.assign({}, state, {
                showNavbar: !state.showNavbar
            })
        default:
        return state
    }
}

const rootReducer = combineReducers({
    response_data,
    savedStations,
    mapQueries,
    queryParameters,
    uiState
})

export default rootReducer;