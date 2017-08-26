import React, { Component } from 'react';
import './Dashboard.css';

import ControlledText from '../ControlledText/ControlledText';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import { connect } from 'react-redux';
import { setQueryParams } from '../../containers/actions';

const containerStyle = {
    maxHeight: 800,
    maxWidth: 500,
    margin: 'auto',
}

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            datasetid: "",
            startdate: "",
            enddate: "",
            locationid: "",
            datatypeid: "",
            units: ""
        }

        this._handleChange = this._handleChange.bind(this)
        this._handleClick = this._handleClick.bind(this)
    }

    _handleChange(key, event) {
        this.setState({[ key ]: event.target.value})
    }

    _handleClick(event){
        const { dispatch } = this.props;
        dispatch(setQueryParams(this.state))
    }

    render() {
        return (
            <div className="Dashboard">
                <div className="apiParameterContainer">
                    <Paper style={containerStyle} zDepth={3}>
                        <AppBar title="Define Parameters" showMenuIconButton={false} />
                        <div className="formContainer">
                            <ControlledText floatingLabel="Dataset ID" hintText="GSOM" handleChange={this._handleChange} value={this.state.datasetid} stateKey="datasetid" />
                            <ControlledText floatingLabel="Data Category" hintText="PRCP" handleChange={this._handleChange} value={this.state.datatypeid} stateKey="datatypeid" />
                            <ControlledText floatingLabel="Location" hintText="ZIP:06830" handleChange={this._handleChange} value={this.state.locationid} stateKey="locationid" />
                            <ControlledText floatingLabel="Start Date" hintText="1964-07-13" handleChange={this._handleChange} value={this.state.startdate} stateKey="startdate" />
                            <ControlledText floatingLabel="End Date" hintText="1972-02-02" handleChange={this._handleChange} value={this.state.enddate} stateKey="enddate" />
                            <div>
                                <RaisedButton onClick={this._handleClick} style={{margin: 15}} label="Next" secondary={true}/>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Dashboard);