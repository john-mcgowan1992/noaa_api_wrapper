import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import ControlledSelect from '../ControlledSelect/ControlledSelect';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Warning from 'material-ui/svg-icons/alert/warning';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import { DATASETS } from '../../middleware/ApiConstants';
import './MapWizard.css';

const paperStyle = {
    width: 220,
    height: 360,
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
                <div >
                    <Tabs>
                        <Tab label="Search">
                            <div className="paperContent">
                                <ControlledSelect label="Dataset" options={DATASETS} value={this.props.params.datasetid}
                                                    handleChange={this.props.setState} paramType="id" stateKey="datasetid" />
                                <ControlledSelect label="Data Category" options={this.props.dataCategories} value={this.props.params.datacategoryid}
                                                    handleChange={this.props.setState} paramType="id" stateKey="datacategoryid" />
                                <ControlledSelect label="Data Types" options={this.props.dataTypes} value={this.props.params.datatypeid}
                                                    handleChange={this.props.setState} paramType="id" stateKey="datatypeid" />
                                { this.props.isFetchingStations ? 
                                    <CircularProgress className="loader" style={{display: 'block', margin: '3% auto'}} /> :
                                    <RaisedButton label="Fetch Stations" onClick={this.props.fetchStations} disabled={!this.props.dataTypes.length || !this.props.params.datatypeid} style={{margin: 15}} secondary={true} />
                                }
                            </div>
                        </Tab>
                        <Tab label="Stations">
                            <div className="stationList">
                                <List>
                                    { this.props.savedStations.length ? this.props.savedStations.map((station, index) => {
                                            return <ListItem primaryText={station.id} key={station.id} />
                                        }) 
                                        : <div className="stationWarning">
                                            <Warning />
                                            <p>No Stations selected.</p>
                                        </div>
                                    }
                                </List>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </Paper>
        )
    }
}

export default MapWizard;
