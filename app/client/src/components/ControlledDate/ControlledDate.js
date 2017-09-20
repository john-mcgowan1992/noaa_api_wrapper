import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';

class ControlledDate extends Component {
    constructor() {
        super()
        this._changeWrapper = this._changeWrapper.bind(this)
        this._checkUserDefinedConstraints = this._checkUserDefinedConstraints.bind(this)
        this._dateSTringtoISO = this._dateStringToISO.bind(this)
    }

    _changeWrapper(e, date) {
        const isoDate = date.toISOString().split("T")[0];
        this.props.handleChange(this.props.stateKey, isoDate)
    }

    _checkUserDefinedConstraints(dateStr, dateConstraint) {
        if (dateStr) {
            return this._dateStringToISO(dateStr)
        } else if (dateConstraint) {
            return this._dateStringToISO(dateConstraint)
        }
    }

    _dateStringToISO(str) {
        const isoDate = new Date(str);
        isoDate.setDate(isoDate.getDate() + 1)
        return isoDate
    }

    render() {
        return (
            <DatePicker openToYearSelection={true} floatingLabelText={this.props.label}
                        minDate={this._dateStringToISO(this.props.minDate)} maxDate={this._dateStringToISO(this.props.maxDate)}
                        onChange={this._changeWrapper} value={this._checkUserDefinedConstraints(this.props.dateString, this.props.dateConstraint)}
             />
        )
    }
}

export default ControlledDate;