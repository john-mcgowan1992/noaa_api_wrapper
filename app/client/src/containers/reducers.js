import { combineReducers } from 'redux';
import { REQUEST_GSOM_DATA, RECEIVE_GSOM_DATA, SET_QUERY_PARAMETERS } from './actions';

function GSOM(
    state= {
        isFetching: false,
        data: []
    },
    action
) {
    switch(action.type) {
        case REQUEST_GSOM_DATA:
            return Object.assign({}, state, {
                isFetching: true
            });
        case RECEIVE_GSOM_DATA:
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

const rootReducer = combineReducers({
    GSOM,
    queryParameters
})

export default rootReducer;