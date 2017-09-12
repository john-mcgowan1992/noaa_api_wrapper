import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapWizard from '../MapWizard/MapWizard';
import MapMarker from '../MapMarker/MapMarker';
import { verifyDatasetCategories, getDataTypesByDatasetCategory, fetchStationsByCoordinates } from '../../middleware/api';
import './MapView.css';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import {default as Alert} from 'material-ui/Snackbar';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Timeline from 'material-ui/svg-icons/action/timeline';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TOGGLE_NAVBAR, ADD_WEATHER_STATION } from '../../containers/actions';
import { API_KEY } from '../../middleware/apiKey';

const defaultProps = {
        center: {lat: 34.7757, lng: -40.5720},
        key: API_KEY,
        defaultZoom: 3,
        selectedMarkerIndex: -1,
        hoveredMarkerIndex: -1
    }

class MapView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            apiParams: {
                datasetid: "",
                datacategoryid: "",
                datatypeid: ""
            },
            boundingCoordinates: {
                ne: {
                    lat: 0,
                    lng: 0
                },
                sw: {
                    lat: 0,
                    lng: 0
                },
                coordsToStr: [0, 0, 0, 0] 
            },
            mapZoom: 4,
            dataCategories: [],
            dataTypes: [],
            viewportStations: [],
            popoverIndexes: {
                hover: -1,
                clicked: -1
            },
            isFetchingCategories: false,
            isFetchingDataTypes: false,
            isFetchingStations: false,
            openAlert: false
        }

        this.createMapOptions = this.createMapOptions.bind(this)
        this._handleChange = this._handleChange.bind(this)
        this._fetchDataCategories = this._fetchDataCategories.bind(this)
        this._fetchDataTypes = this._fetchDataTypes.bind(this)
        this._setBoundingCoordinates = this._setBoundingCoordinates.bind(this)
        this._fetchStations = this._fetchStations.bind(this)
        this._handleMarkerMouseEnter = this._handleMarkerMouseEnter.bind(this)
        this._handleMarkerMouseLeave = this._handleMarkerMouseLeave.bind(this)
        this._handleMapClick = this._handleMapClick.bind(this)
        this._handleMarkerClick = this._handleMarkerClick.bind(this)
        this._addSelectedStation = this._addSelectedStation.bind(this)
        this._handleAlertClose = this._handleAlertClose.bind(this)
    }

    componentWillMount() {
        const { dispatch } = this.props
        dispatch({ type: TOGGLE_NAVBAR })
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({ type: TOGGLE_NAVBAR })
    }

    createMapOptions() {
        return {
            fullscreenControl: false
        }
    }

    _handleChange(key, value, callback=null) {
        const newState = Object.assign({}, this.state.apiParams, {
                [ key ]: value
            })

        if (key === 'datasetid') {
            this.setState({apiParams: newState, dataCategories: [], dataTypes: []}, this._fetchDataCategories)
        } 
        else if (key === 'datacategoryid') {
            this.setState({apiParams: newState, dataTypes: []}, this._fetchDataTypes)
        } 
        else {
            this.setState({apiParams: newState})
        }
    }

    _fetchDataCategories() {
        const { datasetid } = this.state.apiParams;
        this.setState({isFetchingCategories: true})
        verifyDatasetCategories(datasetid)
            .then(res => {
                this.setState({dataCategories: res.data.results})
                this.setState({isFetchingCategories: false})
            })
    }

    _fetchDataTypes() {
        const { datasetid, datacategoryid } = this.state.apiParams;
        this.setState({isFetchingDataTypes: true})
        getDataTypesByDatasetCategory(datasetid, datacategoryid)
            .then(res => {
                this.setState({dataTypes: res.data.results})
                this.setState({isFetchingDataTypes: false})
            })
    }

    _fetchStations() {
        const { apiParams, boundingCoordinates, mapZoom } = this.state
        this.setState({isFetchingStations: true})
        fetchStationsByCoordinates(apiParams, boundingCoordinates, mapZoom)
        .then(res => {
            this.setState({isFetchingStations: false})
            if (res.data.results) {
                this.setState({viewportStations: res.data.results})
            }
        })
    }

    _addSelectedStation(station) {
        const { dispatch, stations } = this.props
        if (stations.stationList.indexOf(station) > -1) {
            this.setState({openAlert: true})
        }
        else {
            dispatch({type: ADD_WEATHER_STATION, station })
        }
    }

    _handleAlertClose() {
        this.setState({openAlert: false})
    }

    _setBoundingCoordinates({center, zoom, bounds}) {
        const { boundingCoordinates } = this.state
        const newBounds = Object.assign({}, boundingCoordinates, {
            ne: bounds.ne,
            sw: bounds.sw,
            coordsToStr: [bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng ]
        })
        this.setState({
            mapZoom: zoom,
            boundingCoordinates: newBounds
        })
    }

    _handleMarkerMouseEnter(key, childProps) {
        const { popoverIndexes } = this.state
        const newIndexes = Object.assign({}, popoverIndexes, {
            hover: +key
        })
        this.setState({popoverIndexes: newIndexes})
    }

    _handleMarkerMouseLeave(key, childProps) {
        const { popoverIndexes } = this.state
        const newIndexes = Object.assign({}, popoverIndexes, {
            hover: -1
        })
        this.setState({popoverIndexes: newIndexes})
    }

    _handleMarkerClick(key, childProps) {
        const { popoverIndexes } = this.state
        const newIndexes = Object.assign({}, popoverIndexes, {
            clicked: +key
        })
        this.setState({popoverIndexes: newIndexes})
    }

    _handleMapClick(key, childProps) {
        const { popoverIndexes } = this.state
        const newIndexes = Object.assign({}, popoverIndexes, {
            clicked: -1
        })
        this.setState({popoverIndexes: newIndexes})
    }

    render() {
        const { popoverIndexes, mapZoom, boundingCoordinates } = this.state
        const markers = this.state.viewportStations.map((station, index) => {
            return <MapMarker lat={station.latitude} lng={station.longitude} station={station} addStation={this._addSelectedStation}
                                isClicked={index === popoverIndexes.clicked} isHovered={index === popoverIndexes.hover} key={index} />
            })
            .filter((place, index) => {
                const shouldRender = (place.props.lat < boundingCoordinates.ne.lat && place.props.lng < boundingCoordinates.ne.lng) && (place.props.lat > boundingCoordinates.sw.lat && place.props.lng > boundingCoordinates.sw.lng);
                if (mapZoom <= 5) {
                    return (index % 5 === 0) && shouldRender
                }
                else {
                    return shouldRender
                }
            })
        return (
            <div className="MapView">
                <Link to="/">
                    <FloatingActionButton mini={true} secondary={true} style={{position: "absolute", left: 30, top: 30}}>
                        <ArrowBack/>
                    </FloatingActionButton>
                </Link>
                <Link to="/charts">
                    <FloatingActionButton mini={true} style={{position: "absolute", left: 30, top: 80}} disabled={!this.props.stations.stationList.length} >
                        <Timeline/>
                    </FloatingActionButton>
                </Link>
                <MapWizard setState={this._handleChange} params={this.state.apiParams} fetchStations={this._fetchStations} 
                            dataCategories={this.state.dataCategories} dataTypes={this.state.dataTypes}
                            savedStations={this.props.stations.stationList} isFetchingStations={this.state.isFetchingStations} />
                <div className="mapContainer">
                    <GoogleMapReact
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.defaultZoom}
                        onChange={this._setBoundingCoordinates}
                        bootstrapURLKeys={{key: defaultProps.key}}
                        options={this.createMapOptions}
                        onChildClick={this._handleMarkerClick}
                        onChildMouseEnter={this._handleMarkerMouseEnter}
                        onChildMouseLeave={this._handleMarkerMouseLeave}
                        onClick={this._handleMapClick}
                    >
                    { markers }
                    </GoogleMapReact>
                    <Alert 
                    open={this.state.openAlert}
                    message="You already added this station!"
                    autoHideDuration={2500}
                    onRequestClose={this._handleAlertClose} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(MapView);