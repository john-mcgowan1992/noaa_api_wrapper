import React, { Component } from 'react';
import StationList from '../StationList/StationList';
import SelectStation from '../SelectStation/SelectStation';
import SelectDates from '../SelectDates/SelectDates';
import ApiDataReview from '../ApiDataReview/ApiDataReview';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { getStationInfo } from '../../api/api';
import { fetchApiData } from '../../containers/actions';

import { connect } from 'react-redux';

const paperStyle = {
    height: 800,
    maxHeight: '90%',
    width: 1200,
    maxWidth: '90%',
    margin: 'auto'
}

class ChartView extends Component {
    constructor() {
        super()
        this.state = {
            stepperIndex: 0,
            stationIndex: null,
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
        this.setState({stepperIndex: newIndex})
    }
    _setState(key, val, callback=null) {
        this.setState({ [ key ]: val }, callback)
    }
    _setStationIndex(key, stationIndex) {
        const stationid = this.props.savedStations.stationList[stationIndex].id;
        this._setState(key, stationIndex, () => {
                getStationInfo(stationid)
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
        const { stationIndex } = this.state
        const { dispatch, savedStations } = this.props
        this._incrementStepper()
        const params = {
            stationid: savedStations.stationList[stationIndex],
            startdate: this.state.startdate,
            enddate: this.state.enddate,
            datatypeid: savedStations.stationList[stationIndex].datatypeid,
            datasetid: savedStations.stationList[stationIndex].datasetid,
            limit: 500
        }
        dispatch(fetchApiData(params))
    }
    render() {
        const steps = [
            <SelectStation stations={this.props.savedStations.stationList} next={this._incrementStepper} stateKey="stationIndex"
                            dynamicSetState={this._setStationIndex} selected={this.state.stationIndex} />,
            <SelectDates next={this._fetchStationData} back={this._decrementStepper} setParameter={this._setState} params={this.state}
                         startdate={this.state.startdate} enddate={this.state.enddate} dateConstraints={this.state.dateConstraints} />,
            <ApiDataReview queryResults={this.props.response_data} next={this._fetchStationData} previous={this._decrementStepper} />
        ]
        return (
            <div className="ChartView">
                <Paper style={paperStyle} zDepth={3}>
                    <Tabs style={{maxHeight: '100%'}}>
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
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ChartView);