import React, { Component } from 'react';
import SettingsInputAntenna from 'material-ui/svg-icons/action/settings-input-antenna';
import './MapMarker.css';
import MapPopover from '../MapPopover/MapPopover';

class MapMarker extends Component {
    render() {
        return (
            <div className="MapMarker">
                <SettingsInputAntenna className="marker" style={{ position: 'relative', top: '-24px', left: '-12px', color: 'RGBA(234, 96, 46, .8)', zIndex: 1}} />
                { this.props.isClicked || this.props.isHovered ? 
                    <MapPopover className="popover" station={this.props.station} /> :
                    null
                }
            </div>
        )
    }
}

export default MapMarker;