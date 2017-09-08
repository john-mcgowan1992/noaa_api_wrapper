import React, { Component } from 'react';
import Place from 'material-ui/svg-icons/maps/place';

class MapMarker extends Component {
    render() {
        return (
            <Place style={{ position: 'relative', top: '-24px', left: '-12px'}} />
        )
    }
}

export default MapMarker;