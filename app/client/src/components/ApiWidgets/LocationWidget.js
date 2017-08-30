import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import StepCard from '../StepCard/StepCard';
import './ApiWidget.css';
import ControlledSelect from '../ControlledSelect/ControlledSelect';

const containerStyle = {
    maxHeight: 800,
    maxWidth: 500,
    margin: 'auto',
}

class LocationWidget extends Component {
    render() {
        return (
            <StepCard cardStyle={containerStyle} title="Select Country">
                <ControlledSelect label="Country" value={this.props.paramVals.locationid} handleChange={this.props.setParameter} 
                                    paramType="id" options={this.props.countries} stateKey="locationid"
                                    disabled={this.props.uiState.isFetching || !this.props.uiState.hasReturned}
                                     />
                <div className="cardButtons">
                    <FlatButton onClick={this.props.previous} style={{margin: 15}} label="Back" />
                    <RaisedButton onClick={this.props.next} disabled={this.props.uiState.isFetching || !this.props.uiState.hasReturned || !this.props.paramVals["locationid"]} style={{margin: 15}} label="Next" secondary={true}/>
                </div>
            </StepCard>
        )
    }
}

export default LocationWidget;