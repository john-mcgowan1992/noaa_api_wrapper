import React, { Component } from 'react';
import SettingsInputAntenna from 'material-ui/svg-icons/action/settings-input-antenna';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class MapMarker extends Component {
    constructor() {
        super()
        this.onMarkerClick = this.onMarkerClick.bind(this)
    }
    onMarkerClick() {
        this.props.addStation(this.props.station)
    }
    render() {
        return (
            <div className="MapMarker">
                { this.props.isHovered ? 
                    <ContentAdd onClick={this.onMarkerClick} className="addMarker" style={{color: "RGBA(64, 255, 240, 1)", width: '36px', height: '36px'}} /> :
                    <SettingsInputAntenna className="antennaMarker" style={{color: "RGBA(234, 96, 46, .8)"}} />
                }
            </div>
        )
    }
}

export default MapMarker;