import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapWizard from '../MapWizard/MapWizard';
import { verifyDatasetCategories, getDataTypesByDatasetCategory } from '../../middleware/api';
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
            this.setState({apiParams: newState}, this._fetchDataCategories)
        } 
        else if (key === 'datacategoryid') {
            this.setState({apiParams: newState}, this._fetchDataTypes)
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

    render() {
        return (
            <div className="MapView">
                <Link to="/">
                    <FloatingActionButton mini={true} secondary={true} style={{position: "absolute", left: 30, top: 30}}>
                        <ArrowBack/>
                    </FloatingActionButton>
                </Link>
                <MapWizard setState={this._handleChange} params={this.state.apiParams} dataCategories={this.state.dataCategories} dataTypes={this.state.dataTypes} />
                <div className="mapContainer">
                    <GoogleMapReact
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        bootstrapURLKeys={{key: defaultProps.key}}
                        options={this.createMapOptions}
                    >
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