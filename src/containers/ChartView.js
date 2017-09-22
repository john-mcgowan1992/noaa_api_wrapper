import React, { Component } from 'react';
import StationList from '../components/StationList';
import SelectDates from '../components/SelectDates';
import ApiDataReview from '../components/ApiDataReview';
import ControlledSelect from '../components/ControlledSelect';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { getStationInfo } from '../api/api';
import { fetchApiData } from '../actions/index';
import { connect } from 'react-redux';

import { cachedQueries, cachedStations } from '../api/ApiConstants';

const paperStyle = {
    margin: 'auto'
}

class ChartView extends Component {
    constructor() {
        super()
        this.state = {
            stepperIndex: 0,
            queryStations: [],
            stationId: null,
            queryKey: "",
            startdate: "",
            enddate: "",
            dateConstraints: {
                mindate: "",
                maxdate: ""
            },
            responseData: {
                data: []
            }
        }
        this._incrementStepper = this._incrementStepper.bind(this)
        this._decrementStepper = this._decrementStepper.bind(this)
        this._setState = this._setState.bind(this)
        this._setQueryKey = this._setQueryKey.bind(this)
        this._setStationIndex = this._setStationIndex.bind(this)
        this._fetchStationData = this._fetchStationData.bind(this)
    }

    _incrementStepper() {
        const { stepperIndex } = this.state
        this.setState({stepperIndex: stepperIndex + 1})
    }
    _decrementStepper() {
        const { stepperIndex } = this.state
        const newIndex = (stepperIndex <= 1) ? 0 : stepperIndex - 1
        this.setState({stepperIndex: newIndex, responseData: { data: [] } })
    }
    _setState(key, val, callback=null) {
        this.setState({ [ key ]: val }, callback)
    }
    _setQueryKey(key, queryKey) {
        this._setState(key, queryKey, () => {
            this.setState({queryStations: this.props.mapQueries.byId[queryKey].stationIds})
        })
    }
    _setStationIndex(key, stationId) {
        this._setState(key, stationId, () => {
                getStationInfo(stationId)
                .then((res) => {
                return res.data
            }).then(data => {
                const dateConstraints = {
                    mindate: data.mindate,
                    maxdate: data.maxdate
                }
                this.setState({dateConstraints})
            })
        })
    }
    _fetchStationData() {
        const { stationId, queryKey } = this.state
        const { dispatch } = this.props
        const query = queryKey.split(".")
        this._incrementStepper()
        const params = {
            stationid: stationId,
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            datatypeid: query[2],
            datasetid: query[0],
            limit: 500
        }
        dispatch(fetchApiData(params))
    }
    render() {
        const steps = [
            <div className="SelectStation">
                <ControlledSelect label="Query Parameters" value={this.state.queryKey} stateKey="queryKey" handleChange={this._setQueryKey}
                                    options={this.props.mapQueries.allIds} valueType={"self"} />
                <ControlledSelect label="Station ID" value={this.state.stationId} stateKey="stationId"
                                  handleChange={this._setStationIndex} options={this.state.queryStations} valueType={"self"} disabled={!this.state.queryKey} />
                <div className="buttonContainer">
                    <RaisedButton disabled={this.props.savedStations.stations.ids.indexOf(this.state.stationId) < 0} label="Next" onClick={this._incrementStepper} secondary={true}/>
                </div>
            </div>,
            <SelectDates next={this._fetchStationData} back={this._decrementStepper} setParameter={this._setState} params={this.state}
                         startdate={this.state.startdate} enddate={this.state.enddate} dateConstraints={this.state.dateConstraints} />,
            <ApiDataReview queryResults={this.props.response_data} next={this._fetchStationData} previous={this._decrementStepper} />
        ]
        return (
            <div className="ChartView flex-container">
                <div className="flex-item item-md">
                    <Paper style={paperStyle} zDepth={3}>
                        <Tabs>
                            <Tab label="Configure Chart">
                                <div className="configureChart">
                                    <Stepper activeStep={this.state.stepperIndex}>
                                        <Step>
                                            <StepLabel>Select Station</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Choose Dates</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Review Data</StepLabel>
                                        </Step>
                                        <Step>
                                            <StepLabel>Chart Type</StepLabel>
                                        </Step>
                                    </Stepper>
                                    { steps[this.state.stepperIndex] }
                                </div>
                            </Tab>
                            <Tab label="Charts">

                            </Tab>
                        </Tabs> 
                    </Paper>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ChartView);