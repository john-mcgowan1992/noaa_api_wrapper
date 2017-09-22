import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import ControlledSelect from './ControlledSelect';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import Warning from 'material-ui/svg-icons/alert/warning';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'material-ui/Tabs';
import { List, ListItem } from 'material-ui/List';
import { DATASETS } from '../api/ApiConstants';

const paperStyle = {
    width: 220,
    height: '60vh',
    minHeight: '350px',
    margin: 'auto',
    position: 'absolute',
    top: 40,
    right: 40,
    zIndex: 99
}

class MapWizard extends Component {
    constructor() {
        super()
        this.state = {
            wizardOpen: true
        }
        this.toggleWizard = this.toggleWizard.bind(this)
    }
    toggleWizard() {
        const { wizardOpen } = this.state
        this.setState({wizardOpen: !wizardOpen})
    }

    render() {
        return (
            <div className="relative-parent">
                <div className={`MapWizard ${!this.state.wizardOpen ? "hide-wizard" : ""}`}>
                    <Tabs className="fill-parent">
                        <Tab label="Search">
                            <div className="content flex-container spread-children">
                                <ControlledSelect label="Dataset" options={DATASETS} value={this.props.params.datasetid}
                                                    handleChange={this.props.setState} paramType="id" stateKey="datasetid" />
                                <ControlledSelect label="Data Category" options={this.props.dataCategories} value={this.props.params.datacategoryid}
                                                    handleChange={this.props.setState} paramType="id" stateKey="datacategoryid" />
                                <ControlledSelect label="Data Types" options={this.props.dataTypes} value={this.props.params.datatypeid}
                                                    handleChange={this.props.setState} paramType="id" stateKey="datatypeid" />
                                <div className="button-container">
                                    { this.props.isFetchingStations ? 
                                        <CircularProgress className="loader" /> :
                                        <RaisedButton label="Fetch Stations" onClick={this.props.fetchStations} disabled={!this.props.dataTypes.length || !this.props.params.datatypeid} style={{margin: 15}} secondary={true} />
                                    }
                                </div>
                            </div>
                        </Tab>
                        <Tab label="Stations">
                            <div className="content flex-container">
                                <div>
                                    <div className="stationList flex-item">
                                        <List>
                                            { this.props.selectedStations.ids.length ? this.props.selectedStations.ids.map((id, index) => {
                                                        return <ListItem primaryText={this.props.selectedStations.byId[id].id} key={id} />
                                                    }) 
                                                    : <div className="stationWarning">
                                                        <Warning />
                                                        <p>No Stations selected.</p>
                                                    </div>
                                                }
                                        </List>
                                    </div>
                                    <div className="chartButton flex-item">
                                        { this.props.selectedStations.ids.length ? <Link to="/charts"><RaisedButton label="Chart Stations" secondary={true} /></Link> : ""}
                                    </div>
                                </div>
                            </div>                    
                        </Tab>
                    </Tabs>
                    <div className="control-tab" >
                        <ChevronRight onClick={this.toggleWizard} className={`chevron ${!this.state.wizardOpen ? "rotate" : ""}`}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MapWizard;
