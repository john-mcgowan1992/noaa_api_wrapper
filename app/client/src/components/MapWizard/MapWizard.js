import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import './MapWizard.css';

const paperStyle = {
    width: 220,
    height: 300,
    margin: 'auto',
    position: 'absolute',
    top: 70,
    right: 40,
    zIndex: 99
}

class MapWizard extends Component {
    render() {
        return (
            <Paper style={paperStyle}>
                <AppBar title="Parameters" showMenuIconButton={false} />
            </Paper>
        )
    }
}

export default MapWizard;
