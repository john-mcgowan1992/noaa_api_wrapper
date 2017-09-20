import React, { Component } from 'react';
import SettingsInputAntenna from 'material-ui/svg-icons/action/settings-input-antenna';
import MapPopover from './MapPopover';

class MapMarker extends Component {
    render() {
        return (
            <div className="MapMarker">
                <SettingsInputAntenna className="marker" style={{color: "RGBA(234, 96, 46, .8)"}} />
                { this.props.isClicked || this.props.isHovered ? 
                    <MapPopover className="popover" station={this.props.station} addStation={this.props.addStation} /> :
                    null
                }
            </div>
        )
    }
}

export default MapMarker;