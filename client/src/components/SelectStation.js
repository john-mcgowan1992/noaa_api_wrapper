import React, { Component } from 'react';
import ControlledSelect from './ControlledSelect';
import RaisedButton from 'material-ui/RaisedButton';

class SelectStation extends Component {
    constructor() {
        super()
        this._setStation = this._setStation.bind(this)
    }
    _setStation(key, value) {
        this.props.dynamicSetState(key, value)
    }
    render() {
        return (
            <div className="SelectStation">
                <ControlledSelect label="Station ID" value={this.props.selected} stateKey={this.props.stateKey}
                                  handleChange={this._setStation} options={this.props.stations} valueType={"index"} />
                <div className="buttonContainer">
                    <RaisedButton disabled={!this.props.stations[this.props.selected]} label="Next" onClick={this.props.next} secondary={true}/>
                </div>
            </div>
        )
    }
}

export default SelectStation;