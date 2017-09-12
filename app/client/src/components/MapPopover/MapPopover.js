import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Add from 'material-ui/svg-icons/content/add';
import './MapPopover.css';

class MapPopover extends Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.addStation(this.props.station)
    }

    render() {
        const { station } = this.props
        return (
            <div className="MapPopover">
                <div className="popoverContent">
                    <div>Station: {station.name}</div>
                    <div>Data Coverage: {this.props.station.datacoverage}</div>
                    <div>Min Date: {this.props.station.mindate}</div>
                    <div>Max Date: {station.maxdate}</div>
                    <div className="addButton">
                        <FlatButton onClick={this.handleClick} primary={true} label="Add Station" icon={<Add />} />
                    </div>
                </div>
            </div>
        )
    }
}

export default MapPopover;