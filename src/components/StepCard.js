import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

class StepCard extends Component {
    render() {
        return (
            <div className="StepCard">
                <Paper style={this.props.cardStyle}>
                    <AppBar title={this.props.title} showMenuIconButton={false} />
                    <div className="stepCardContent">
                        { this.props.children }
                    </div>
                </Paper>
            </div>
        )
    }
}

export default StepCard