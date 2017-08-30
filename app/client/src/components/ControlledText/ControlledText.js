import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class ControlledText extends Component {
    constructor(){
        super()
        this._changeWrapper = this._changeWrapper.bind(this)
    }

    _changeWrapper(e) {
        this.props.handleChange(this.props.stateKey, e.target.value)
    }

    render() {
        return (
            <TextField floatingLabelText={this.props.floatingLabel} 
                        hintText={this.props.hintText}
                        onChange={this._changeWrapper}
                        value={this.props.value} />
        )
    }
}

export default ControlledText;