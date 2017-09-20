import React, { Component } from 'react';
import ControlledDate from '../ControlledDate/ControlledDate';
import StepCard from '../StepCard/StepCard';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const containerStyle = {
    maxHeight: 800,
    maxWidth: 500,
    margin: 'auto',
}

class DateWidget extends Component {
    render() {
        return (
            <StepCard cardStyle={containerStyle} title="Pick Dates">
                <ControlledDate label="Start Date" dateString={this.props.paramVals["startdate"]}
                                handleChange={this.props.setParameter}
                                minDate={this.props.dateConstraints.mindate} maxDate={this.props.dateConstraints.maxdate} 
                                dateConstraint={this.props.dateConstraints.mindate}
                                stateKey="startdate" />
                <ControlledDate label="End Date" dateString={this.props.paramVals["enddate"]}
                                handleChange={this.props.setParameter} 
                                minDate={this.props.dateConstraints.mindate} maxDate={this.props.dateConstraints.maxdate} 
                                dateConstraint={this.props.dateConstraints.maxdate}
                                stateKey="enddate" />
                <div className="cardButton">
                    <FlatButton onClick={this.props.previous} style={{margin: 15}} label="Back"/>
                    <RaisedButton onClick={this.props.next} disabled={!this.props.paramVals.startdate || !this.props.paramVals.enddate} style={{margin: 15}} label="Next" secondary={true} />
                </div>
            </StepCard>
        )
    }
}

export default DateWidget;