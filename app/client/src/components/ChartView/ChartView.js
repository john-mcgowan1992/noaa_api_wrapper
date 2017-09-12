import React, { Component } from 'react';
import './ChartView.css';
import StationList from '../StationList/StationList';
import ChartConfig from '../ChartConfig/ChartConfig';

import { connect } from 'react-redux';

class ChartView extends Component {
    render() {
        return (
            <div className="ChartView">
                <StationList stations={this.props.stations.stationList} />
                <ChartConfig />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ChartView);