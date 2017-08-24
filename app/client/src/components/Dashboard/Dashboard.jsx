import React, { Component } from 'react';
import './Dashboard.css';

import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

const containerStyle = {
    height: 450,
    width: 400,
    margin: 20
}

class Dashboard extends Component {
    render() {
        return (
            <div className="Dashboard">
                <div className="apiParameterContainer">
                    <Paper style={containerStyle} zDepth={3}>
                        <AppBar title="Make Request" showMenuIconButton={false} />
                        <TextField floatingLabelText="Dataset" hintText="GSOM"/>
                        <TextField floatingLabelText="Data Category" hintText="PRCP"/>
                        <TextField floatingLabelText="Location" hintText="ZIP:06830"/>
                        <TextField floatingLabelText="Start Date" hintText="1964-07-13"/>
                        <TextField floatingLabelText="End Date" hintText="1972-02-27"/>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default Dashboard;