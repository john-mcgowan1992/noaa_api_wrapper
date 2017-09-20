import axios from 'axios';

export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";
export const SET_QUERY_PARAMETERS = "SET_QUERY_PARAMETERS";
export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";

export const ADD_SAVED_WEATHER_STATION = "ADD_SAVED_WEATHER_STATION";
export const FETCH_MAP_VIEWPORT_STATIONS = "FETCH_MAP_VIEWPORT_STATIONS";
export const SET_MAP_VIEWPORT_STATIONS = "SET_MAP_VIEWPORT_STATIONS";
export const ADD_MAP_QUERY = "ADD_MAP_QUERY";

export const SET_MAP_API_PARAMS = "SET_MAP_API_PARAMS";
export const SET_MAP_CONFIG = "SET_MAP_CONFIG";


export function fetchApiData (requestParams) {
    return dispatch => {
        dispatch({ type: REQUEST_API_DATA, requestParams })
        axios.get("/api/noaa/data", {
            params: requestParams
        })
        .then(res => {
            console.log("res:", res);
            return res.data
        })
        .then(data => dispatch({ type: RECEIVE_API_DATA, data }))
        .catch(error => console.error(error))
    }
}

export function setQueryParams(queryParameters) {
    return dispatch => {
        dispatch({ type: SET_QUERY_PARAMETERS, queryParameters })
    }
}