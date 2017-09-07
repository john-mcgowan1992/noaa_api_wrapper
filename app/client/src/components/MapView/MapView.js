import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapWizard from '../MapWizard/MapWizard';
import './MapView.css';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigateBefore from 'material-ui/svg-icons/image/navigate-before';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { TOGGLE_NAVBAR } from '../../containers/actions';

const defaultProps = {
        center: {lat: 41.85, lng: -85.65},
        zoom: 4,
        key: "AIzaSyBJ1ZO_5jPvZSt1krm7xafGresIaLjSTR0",
        selectedMarkerIndex: -1,
        hoveredMarkerIndex: -1
    }

class MapView extends Component {

    componentWillMount() {
        const { dispatch } = this.props
        dispatch({ type: TOGGLE_NAVBAR })
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch({ type: TOGGLE_NAVBAR })
    }

    render() {
        return (
            <div className="MapView">
                <Link to="/">
                    <FloatingActionButton mini={true} secondary={true} style={{position: "absolute", left: 30, top: 30}}>
                        <NavigateBefore/>
                    </FloatingActionButton>
                </Link>
                <MapWizard />
                <div className="mapContainer">
                    <GoogleMapReact
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        bootstrapURLKeys={{key: defaultProps.key}}
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