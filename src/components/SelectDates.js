import React, { Component } from 'react'
import ControlledDate from './ControlledDate';
import RaisedButton from 'material-ui/RaisedButton';

class SelectDates extends Component {
    render() {
        return (
            <div className="SelectDates">
                <ControlledDate label="Start Date" dateString={this.props.startdate}
                                handleChange={this.props.setParameter}
                                minDate={this.props.dateConstraints.mindate} maxDate={this.props.dateConstraints.maxdate}
                                dateConstraint={this.props.dateConstraints.mindate}
                                stateKey="startdate" />
                <ControlledDate label="End Date" dateString={this.props.enddate}
                                handleChange={this.props.setParameter}
                                minDate={this.props.dateConstraints.mindate} maxDate={this.props.dateConstraints.maxdate}
                                dateConstraint={this.props.dateConstraints.maxdate}
                                stateKey="enddate" />
                <div className="buttonContainer">
                    <RaisedButton label="Back" style={{margin: 15}} onClick={this.props.back}/>
                    <RaisedButton label="Next" style={{margin: 15}} onClick={this.props.next} disabled={!this.props.params.startdate || !this.props.params.enddate}/>
                </div>
            </div>
            
        )
    }
}

export default SelectDates;