import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class ControlledSelect extends Component {
    static defaultProps = {
        valueType: "id"
    }
    constructor() {
        super()
        this._changeWrapper = this._changeWrapper.bind(this)
    }

    _changeWrapper(e, index, value) {
        this.props.handleChange(this.props.stateKey, value)
    }

    render() {
        const options = this.props.options.map((option, index) => {
            let value,
                text;
            const {valueType } = this.props
            if (valueType === "self") {
                value = option
                text = option
            } 
            else if (valueType === "index") {
                value = index
                text = option
            } 
            else {
                value = option[valueType]
                text = option.name
            }
            return <MenuItem primaryText={text} value={value} key={index} />
        })
        return (
            <SelectField floatingLabelText={this.props.label} style={{textAlign: "left"}} autoWidth={true} 
                         value={this.props.value} onChange={this._changeWrapper}
                         disabled={this.props.disabled || !options.length} >
                {options}
            </SelectField>
        )
    }
}

export default ControlledSelect;