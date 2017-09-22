import React, { Component } from 'react';
import ControlledSelect from './ControlledSelect';
import RaisedButton from 'material-ui/RaisedButton';

class SelectStation extends Component {
    constructor() {
        super()
        this._setQueryState = this._setQueryState.bind(this)
    }
    _setQueryState(key, value) {
        this.props.dynamicSetState(key, value)
    }
    render() {
        return (
            <div className="SelectStation">
                <ControlledSelect label="Query Parameters" value={this.props.query} stateKey={this.props.queryKey} handleChange={this._setQueryState}
                                    options={this.props.queries.allIds} valueType={"self"} />
                <ControlledSelect label="Station ID" value={this.props.station} stateKey={this.props.stationKey}
                                  handleChange={this._setQueryState} options={this.props.stations.ids} valueType={"self"} disabled={!this.props.query} />
                <div className="buttonContainer">
                    <RaisedButton disabled={this.props.stations.ids.indexOf(this.props.station) < 0} label="Next" onClick={this.props.next} secondary={true}/>
                </div>
            </div>
        )
    }
}

export default SelectStation;