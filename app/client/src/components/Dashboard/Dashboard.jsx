import React, { Component } from 'react';
import './Dashboard.css';
import MetaDataWidget from '../ApiWidgets/MetaDataWidget';
import LocationWidget from '../ApiWidgets/LocationWidget';
import DateWidget from '../ApiWidgets/DateWidget';
import ReviewParamWidget from '../ApiWidgets/ReviewParamWidget';
import ApiDataDisplay from '../ApiDataDisplay/ApiDataDisplay';
import { verifyDatasetCategories, verifyDatasetLocation, getLocationDateConstraints } from '../../middleware/api';
import { DATASETS } from '../../middleware/ApiConstants';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import { connect } from 'react-redux';
import { setQueryParams, fetchApiData } from '../../containers/actions';

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            apiParams: {
                datasetid: "",
                startdate: "",
                enddate: "",
                locationid: "",
                datacategoryid: "",
                units: "standard"
            },
            datasetcategories: [],
            dateConstraints: {
                mindate: "",
                maxdate: ""
            },
            countries: [],
            metadata: {
                isFetching: false,
                hasReturned: false
            },
            locationUI: {
                isFetching: false,
                hasReturned: false
            },  
            stepperIndex: 0,
            lastStep: false
        }

        this._handleChange = this._handleChange.bind(this)
        this._stepForward = this._stepForward.bind(this)
        this._stepForwardFetchLocations = this._stepForwardFetchLocations.bind(this)
        this._stepForwardFetchData = this._stepForwardFetchData.bind(this)
        this._stepBack = this._stepBack.bind(this)
        this._completeStepper = this._completeStepper.bind(this)
        this._setDatasetFetchCategories = this._setDatasetFetchCategories.bind(this)
        this._setLocationFetchDateConstraints = this._setLocationFetchDateConstraints.bind(this)
    }

    _handleChange(key, value, callback=null) {
        const newState = Object.assign({}, this.state.apiParams, {
            [ key ]: value
        })
        this.setState({apiParams: newState}, callback)
    }

    _setDatasetFetchCategories(key, value) {
        this._handleChange(key, value, () => {
            const { datasetid } = this.state.apiParams;
            if (key === 'datasetid') {
                const resetParams = Object.assign({}, this.state.apiParams, {
                    datacategoryid: "",
                    locationid: ""
                })
                this.setState({apiParams: resetParams})
            }
            const newState = Object.assign({}, this.state.metadata, {
                        isFetching: true,
                    })
            this.setState({metadata: newState})
            verifyDatasetCategories(datasetid)
                .then(res => {
                    return res.data
                })
                .then(data => {
                    this.setState({datasetcategories: data.results})
                    const newMetadataState = {
                        isFetching: false,
                        hasReturned: true
                    }
                    this.setState({metadata: newMetadataState})
                })
        })
    }

    _setLocationFetchDateConstraints(key, value) {
        this._handleChange(key, value, () => {
            const { locationid } = this.state.apiParams;
            getLocationDateConstraints(locationid)
                .then(res => {
                    console.log('res here: ', res)
                    return res.data
                })
                .then(data => {
                    const newDates = {
                        mindate: data.mindate,
                        maxdate: data.maxdate
                    }
                    this.setState({dateConstraints: newDates})
                })
        })
    }

    _stepForward() {
        const { dispatch } = this.props;
        const { stepperIndex, lastStep } = this.state;
        dispatch(setQueryParams(this.state.apiParams))
        this.setState({"stepperIndex": stepperIndex + 1})
        this.setState({"lastStep": stepperIndex >= 4})
    }

    _stepForwardFetchLocations(event) {
        this._stepForward(event)
        const { datacategoryid, datasetid } = this.state.apiParams;
        const newState = Object.assign({}, this.state.locationUI, {
                    isFetching: true,
                    hasReturned: false
                })
        this.setState({locationUI: newState})
        verifyDatasetLocation(datasetid, datacategoryid)
            .then(res => {
                return res.data
            })
            .then(data => {
                console.log("data: ", data);
                this.setState({countries: data.results})
                const newState = Object.assign({}, this.state.locationUI, {
                    isFetching: false,
                    hasReturned: true
                })
                this.setState({locationUI: newState})
            })
    }

    _stepForwardFetchData(event) {
        const { dispatch } = this.props
        this._stepForward(event)
        dispatch(fetchApiData(this.props.queryParameters))
    }

    _stepBack() {
        const { stepperIndex } = this.state;
        this.setState({"stepperIndex": stepperIndex - 1})
    }

    _completeStepper() {
        console.log("Complete!")
    }

    render() {
        const steps = [
            <MetaDataWidget next={this._stepForwardFetchLocations} uiState={this.state.metadata} setParameter={this._setDatasetFetchCategories} datasets={DATASETS} dataCategories={this.state.datasetcategories} paramVals={this.state.apiParams} />,
            <LocationWidget next={this._stepForward} previous={this._stepBack} uiState={this.state.locationUI} setParameter={this._setLocationFetchDateConstraints} countries={this.state.countries} paramVals={this.state.apiParams} />,
            <DateWidget next={this._stepForward} previous={this._stepBack} setParameter={this._handleChange} dateConstraints={this.state.dateConstraints} paramVals={this.state.apiParams} />,
            <ReviewParamWidget next={this._stepForwardFetchData} previous={this._stepBack} paramVals={this.state.apiParams} />,
            <ApiDataDisplay next={this._completeStepper} previous={this._stepBack} queryResults={this.props.response_data}/>
        ]
        return (
            <div className="Dashboard">
                <div>
                    <Stepper activeStep={this.state.stepperIndex}>
                        <Step>
                            <StepLabel>Configure MetaData</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Choose Country</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Choose Dates</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Review Parameters</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Export to Map</StepLabel>
                        </Step>
                    </Stepper>
                </div>
                {
                    this.state.lastStep === true ? steps[steps.length-1] : steps[this.state.stepperIndex]
                }
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Dashboard);