export const REQUEST_GSOM_DATA = "REQUEST_GSOM_DATA";
export const RECEIVE_GSOM_DATA = "RECEIVE_GSOM_DATA";

export function fetchGSOMData () {
    return dispatch => {
        dispatch({ type: REQUEST_GSOM_DATA })
        dispatch({ type: RECEIVE_GSOM_DATA })
    }
}