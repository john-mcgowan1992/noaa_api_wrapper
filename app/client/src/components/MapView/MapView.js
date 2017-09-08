import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapWizard from '../MapWizard/MapWizard';
import MapMarker from '../MapMarker/MapMarker';
import { verifyDatasetCategories, getDataTypesByDatasetCategory, fetchStationsByCoordinates } from '../../middleware/api';
import './MapView.css';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TOGGLE_NAVBAR } from '../../containers/actions';
import { API_KEY } from '../../middleware/apiKey';

const defaultProps = {
        center: {lat: 41.85, lng: -85.65},
        zoom: 4,
        key: API_KEY,
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
            dataCategories: [],
            dataTypes: [],
            viewportStations: [],
            isFetchingCategories: false,
            isFetchingDataTypes: false
        }

        this.createMapOptions = this.createMapOptions.bind(this)
        this._handleChange = this._handleChange.bind(this)
        this._fetchDataCategories = this._fetchDataCategories.bind(this)
        this._fetchDataTypes = this._fetchDataTypes.bind(this)
        this._setBoundingCoordinates = this._setBoundingCoordinates.bind(this)
        this._fetchStations = this._fetchStations.bind(this)
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
        verifyDatasetCategories(datasetid)
            .then(res => {
                this.setState({isFetchingCategories: true})
                return res.data
            })
            .then(data => {
                this.setState({dataCategories: data.results})
                this.setState({isFetchingCategories: false})
            })
    }

    _fetchDataTypes() {
        const { datasetid, datacategoryid } = this.state.apiParams;
        getDataTypesByDatasetCategory(datasetid, datacategoryid)
            .then(res => {
                this.setState({isFetchingDataTypes: true})
                return res.data
            })
            .then(data => {
                this.setState({dataTypes: data.results})
                this.setState({isFetchingDataTypes: false})
            })
    }

    _fetchStations() {
        const { apiParams, boundingCoordinates } = this.state
        fetchStationsByCoordinates(apiParams, boundingCoordinates)
        .then(res => {
            return res.data;
        })
        .then(data => {
            console.log("data: ", data);
            if (data.results) {
                this.setState({viewportStations: data.results})
            }
        })
    }

    _setBoundingCoordinates({center, zoom, bounds}) {
        const { boundingCoordinates } = this.state
        const newBounds = Object.assign({}, boundingCoordinates, {
            ne: bounds.ne,
            sw: bounds.sw,
            coordsToStr: [bounds.sw.lat, bounds.sw.lng, bounds.ne.lat, bounds.ne.lng ]
        })
        this.setState({boundingCoordinates: newBounds})
    }

    render() {
        const markers = this.state.viewportStations.map((station, index) => {
            return <MapMarker lat={station.latitude} lng={station.longitude} key={index} />
        })
        return (
            <div className="MapView">
                <Link to="/">
                    <FloatingActionButton mini={true} secondary={true} style={{position: "absolute", left: 30, top: 30}}>
                        <ArrowBack/>
                    </FloatingActionButton>
                </Link>
                <MapWizard setState={this._handleChange} params={this.state.apiParams} fetchStations={this._fetchStations} dataCategories={this.state.dataCategories} dataTypes={this.state.dataTypes} />
                <div className="mapContainer">
                    <GoogleMapReact
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        onChange={this._setBoundingCoordinates}
                        bootstrapURLKeys={{key: defaultProps.key}}
                        options={this.createMapOptions}
                    >
                    { markers }
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(MapView);