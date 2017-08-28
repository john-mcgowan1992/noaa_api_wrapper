import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import './ApiWidget.css';
import ControlledText from '../ControlledText/ControlledText';

const containerStyle = {
    maxHeight: 800,
    maxWidth: 500,
    margin: 'auto',
}

class ApiWidget extends Component {
    render() {
        return (
            <div className="ApiWidget">
                <Paper style={containerStyle} zDepth={3}>
                    <AppBar title="Define Parameters" showMenuIconButton={false} />
                    <div className="formContainer">
                        <ControlledText floatingLabel="Dataset ID" hintText="GSOM" handleChange={this.props.setParameter} value={this.props.paramVals.datasetid} stateKey="datasetid" />
                        <ControlledText floatingLabel="Data Category" hintText="PRCP" handleChange={this.props.setParameter} value={this.props.paramVals.datatypeid} stateKey="datatypeid" />
                        <ControlledText floatingLabel="Location" hintText="ZIP:06830" handleChange={this.props.setParameter} value={this.props.paramVals.locationid} stateKey="locationid" />
                        <ControlledText floatingLabel="Start Date" hintText="1964-07-13" handleChange={this.props.setParameter} value={this.props.paramVals.startdate} stateKey="startdate" />
                        <ControlledText floatingLabel="End Date" hintText="1972-02-02" handleChange={this.props.setParameter} value={this.props.paramVals.enddate} stateKey="enddate" />
                        <div>
                            <RaisedButton onClick={this.props.next} style={{margin: 15}} label="Make Request" secondary={true}/>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    }
}

export default ApiWidget;