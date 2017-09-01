import React, { Component } from 'react';
import StepCard from '../StepCard/StepCard';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import './ApiWidget.css';

const containerStyle = {
    maxHeight: 800,
    maxWidth: 500,
    margin: 'auto',
}

class ReviewParamWidget extends Component {
    render() {
        return (
            <StepCard cardStyle={containerStyle} title="Review Parameters">
                <div>
                    <span>Dataset: {this.props.paramVals.datasetid}</span>
                    <Divider/>
                    <span>Data Category: {this.props.paramVals.datacategoryid}</span>
                    <Divider/>
                    <span>Country: {this.props.paramVals.locationid}</span>
                    <Divider/>
                    <span>Start Date: {this.props.paramVals.startdate}</span>
                    <Divider/>
                    <span>End Date: {this.props.paramVals.enddate}</span>
                    <Divider/>
                </div>
                <div className="cardButton"> 
                    <FlatButton onClick={this.props.previous} style={{margin: 15}} label="Back" />
                    <RaisedButton onClick={this.props.next} style={{margin: 15}} label="Next" secondary={true} />
                </div>
            </StepCard>
        )
    }
}

export default ReviewParamWidget;