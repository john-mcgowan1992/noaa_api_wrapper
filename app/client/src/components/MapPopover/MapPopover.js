import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Add from 'material-ui/svg-icons/content/add';
import './MapPopover.css';

class MapPopover extends Component {
    render() {
        const { station } = this.props
        return (
            <div className="MapPopover">
                <AppBar title={<span>{station.name}</span>} iconElementLeft={<IconButton><NavigationClose/></IconButton>} /> 
                <div className="popoverContent">
                    <div>Data Coverage: {this.props.station.datacoverage}</div>
                    <div>Min Date: {this.props.station.mindate}</div>
                    <div>Max Date: {station.maxdate}</div>
                    <div className="addButton">
                        <FlatButton primary={true} label="Add Station" icon={<Add />} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MapPopover;