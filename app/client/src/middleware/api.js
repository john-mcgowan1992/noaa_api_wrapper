import axios from 'axios';

export function verifyDatasetCategories(datasetid) {
    return axios.get("/api/noaa/dataset/categories", {
        params: {
            datasetid
        }
    })
}

export function verifyDatasetLocation(datasetid, datacategoryid) {
    return axios.get("/api/noaa/dataset/location", {
        params: {
            datasetid,
            datacategoryid,
            locationcategoryid: "CNTRY",
            limit: 200
        }
    })
}

export function getDataTypesByDatasetCategory(datasetid, datacategoryid) {
    return axios.get("/api/noaa/datatypes", {
        params: {
            datasetid,
            datacategoryid,
            limit: 200
        }
    })
}

export function fetchStationsByCoordinates(params, coordinates) {
    return axios.get("/api/noaa/stations", {
        params: {
            datasetid: params.datasetid,
            datatypeid: params.datatypeid,
            extent: coordinates.coordsToStr.join(","),
            limit: 1000,
            sortfield: 'datacoverage'
        }
    })
}

export function getLocationDateConstraints(locationid) {
    return axios.get("/api/noaa/location/info", {
        params: {
            locationid
        }
    })
}