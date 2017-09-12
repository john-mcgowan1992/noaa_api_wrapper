import { combineReducers } from 'redux';
import { REQUEST_API_DATA, RECEIVE_API_DATA, SET_QUERY_PARAMETERS, TOGGLE_NAVBAR, ADD_WEATHER_STATION } from './actions';

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

function stations(
    state={
        stationList: []
    },
    action
) {
    switch(action.type) {
        case ADD_WEATHER_STATION:
            return Object.assign({}, state, {
                stationList: [
                    ...state.stationList,
                    action.station
                ]
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
    stations,
    queryParameters,
    uiState
})

export default rootReducer;