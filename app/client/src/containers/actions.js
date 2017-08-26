import axios from 'axios';

export const REQUEST_GSOM_DATA = "REQUEST_GSOM_DATA";
export const RECEIVE_GSOM_DATA = "RECEIVE_GSOM_DATA";
export const SET_QUERY_PARAMETERS = "SET_QUERY_PARAMETERS";

export function fetchGSOMData (requestParams) {
    return dispatch => {
        dispatch({ type: REQUEST_GSOM_DATA, requestParams })
        axios.get("/api/noaa/data", {
            params: {
                datasetid: "GSOM",
                startdate: "1941-06-06",
                enddate: "1949-11-04",
                locationid: "ZIP:06830",
                datatypeid: "PRCP",
                units: "standard"
            }
        })
        .then(res => {
            console.log("res:", res);
            return res.data
        })
        .then(data => dispatch({ type: RECEIVE_GSOM_DATA, data }))
        .catch(error => console.error(error))
    }
}

export function setQueryParams(queryParameters) {
    return dispatch => {
        dispatch({ type: SET_QUERY_PARAMETERS, queryParameters })
    }
}