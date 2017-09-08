import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ControlledSelect extends Component {
    constructor() {
        super()
        this._changeWrapper = this._changeWrapper.bind(this)
    }

    _changeWrapper(e, index, value) {
        this.props.handleChange(this.props.stateKey, value)
    }

    render() {
        const options = this.props.options.map((option, key) => {
            return <MenuItem primaryText={option.name} value={option.id} key={key} />
        })
        return (
            <SelectField floatingLabelText={this.props.label} style={{textAlign: "left"}} 
                         value={this.props.value} onChange={this._changeWrapper}
                         disabled={this.props.disabled || !options.length} >
                {options}
            </SelectField>
        )
    }
}

export default ControlledSelect;