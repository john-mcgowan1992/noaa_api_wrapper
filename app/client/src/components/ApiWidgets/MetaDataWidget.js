import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import StepCard from '../StepCard/StepCard';
import './ApiWidget.css';
import ControlledText from '../ControlledText/ControlledText';
import ControlledSelect from '../ControlledSelect/ControlledSelect';

const containerStyle = {
    maxHeight: 800,
    maxWidth: 500,
    margin: 'auto',
}

class ApiWidget extends Component {
    render() {
        return (
            <StepCard cardStyle={containerStyle} title="Configure Metadata">
                <ControlledSelect label="DataSet" value={this.props.paramVals.datasetid} handleChange={this.props.setParameter} 
                                    paramType="id" options={this.props.datasets} stateKey="datasetid" />
                <ControlledSelect label="Data Categories" value={this.props.paramVals.datacategoryid} disabled={this.props.uiState.isFetching || !this.props.hasReturned}
                                    handleChange={this.props.setParameter} 
                                    paramType="id" options={this.props.dataCategories} stateKey="datacategoryid" />
                <div className="cardButtons">
                    <RaisedButton onClick={this.props.next} disabled={this.props.uiState.isFetching || !this.props.uiState.hasReturned} style={{margin: 15}} label="Next" secondary={true}/>
                </div>
            </StepCard>
        )
    }
}

export default ApiWidget;


// <ControlledSelect label="Country" value={this.props.paramVals.locationid} handleChange={this.props.setParameter} paramType="id" options={this.props.countries} stateKey="locationid" />
// <ControlledText floatingLabel="Start Date" hintText="1964-07-13" handleChange={this.props.setParameter} value={this.props.paramVals.startdate} stateKey="startdate" />
// <ControlledText floatingLabel="End Date" hintText="1972-02-02" handleChange={this.props.setParameter} value={this.props.paramVals.enddate} stateKey="enddate" />