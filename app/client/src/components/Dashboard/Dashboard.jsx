import React, { Component } from 'react';
import './Dashboard.css';
import ApiWidget from '../ApiWidget/ApiWidget';
import ApiDataDisplay from '../ApiDataDisplay/ApiDataDisplay';

import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';

import { connect } from 'react-redux';
import { setQueryParams, fetchGSOMData } from '../../containers/actions';

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            apiParams: {
                datasetid: "",
                startdate: "",
                enddate: "",
                locationid: "",
                datatypeid: "",
                units: ""
            },
            stepperIndex: 0
        }

        this._handleChange = this._handleChange.bind(this)
        this._handleClick = this._handleClick.bind(this)
        this._completeStepper = this._completeStepper.bind(this)
        this._stepBack = this._stepBack.bind(this)
    }

    _handleChange(key, event) {
        const newState = Object.assign({}, this.state.apiParams, {
            [ key ]: event.target.value
        })
        this.setState({apiParams: newState})
    }

    _handleClick(event) {
        const { dispatch } = this.props;
        const { stepperIndex } = this.state;
        dispatch(setQueryParams(this.state.apiParams))
        dispatch(fetchGSOMData(this.state.apiParams))
        this.setState({"stepperIndex": stepperIndex + 1})
    }

    _completeStepper() {
        const { stepperIndex } = this.state;
        this.setState({"stepperIndex": stepperIndex + 1})
    }

    _stepBack() {
        const { stepperIndex } = this.state;
        this.setState({"stepperIndex": stepperIndex - 1})
    }

    render() {
        return (
            <div className="Dashboard">
                <div>
                    <Stepper activeStep={this.state.stepperIndex}>
                        <Step>
                            <StepLabel>Configure Request</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Raw Results</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Export to Chart</StepLabel>
                        </Step>
                    </Stepper>
                </div>
                {
                    this.state.stepperIndex === 0 ? 
                    <ApiWidget next={this._handleClick} setParameter={this._handleChange} paramVals={this.state.apiParams} /> :
                    <ApiDataDisplay next={this._completeStepper} previous={this._stepBack} queryResults={this.props.GSOM}/>
                }
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(Dashboard);