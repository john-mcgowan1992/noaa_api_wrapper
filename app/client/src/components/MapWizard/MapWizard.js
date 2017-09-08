import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import ControlledSelect from '../ControlledSelect/ControlledSelect';
import { DATASETS } from '../../middleware/ApiConstants';
import './MapWizard.css';

const paperStyle = {
    width: 220,
    height: 300,
    margin: 'auto',
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 99
}

class MapWizard extends Component {
    render() {
        return (
            <Paper className="MapWizard" style={paperStyle}>
                <div className="paperContent">
                    <ControlledSelect label="Dataset" options={DATASETS} value={this.props.params.datasetid}
                                        handleChange={this.props.setState} paramType="id" stateKey="datasetid" />
                    <ControlledSelect label="Data Category" options={this.props.dataCategories} value={this.props.params.datacategoryid}
                                        handleChange={this.props.setState} paramType="id" stateKey="datacategoryid" />
                    <ControlledSelect label="Data Types" options={this.props.dataTypes} value={this.props.params.datatypeid}
                                        handleChange={this.props.setState} paramType="id" stateKey="datatypeid" />
                </div>
            </Paper>
        )
    }
}

export default MapWizard;
