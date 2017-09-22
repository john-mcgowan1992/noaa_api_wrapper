import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import JSONTree from 'react-json-tree';

const containerStyle = {
    maxWidth: 500,
    margin: 'auto',
}

const theme = {
    scheme: 'monokai',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
};

class ApiDataReview extends Component {
    render() {
        return (
            <div className="ApiDataDisplay">
                <div className="resultsContainer">
                    <div className="dataResults">
                        <JSONTree data={this.props.queryResults.data} theme={theme} hideRoot={true} invertTheme={true} />
                    </div>
                    <div className="stepButton">
                        <FlatButton onClick={this.props.previous} style={{margin: 15}} label="Back" />
                        <RaisedButton onClick={this.props.next} style={{margin: 15}} label="Next" secondary={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApiDataReview;