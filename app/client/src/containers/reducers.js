import { combineReducers } from 'redux';
import { REQUEST_GSOM_DATA, RECEIVE_GSOM_DATA } from './actions';

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
                data: [{PRCP: 28.2}, {PRCP: 24.1}]
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    GSOM
})

export default rootReducer;