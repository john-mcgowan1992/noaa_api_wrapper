import React, { Component } from 'react';
import './ChartConfig.css';
import StepCard from '../StepCard/StepCard';

const cardStyle = {
    maxHeight: 700,
    width: 800,
    margin: 'auto'
}

class ChartConfig extends Component {
    render() {
        return (
            <div className="ChartConfig" >
                <StepCard title="Configure Chart" cardStyle={cardStyle}>

                </StepCard>
            </div>
        )
    }
}

export default ChartConfig;