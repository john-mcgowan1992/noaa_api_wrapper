import React, { Component } from 'react';
import './ChartConfig.css';
import StepCard from '../StepCard/StepCard';

const cardStyle = {
    height: 400,
    width: 600,
    maxWidth: '90%',
    maxHeight: '90%',
    margin: 'auto'
}

class ChartConfig extends Component {
    render() {
        return (
            <div className="ChartConfig" >
                <StepCard title="Configure Chart" cardStyle={cardStyle}>
                    <div className="configContainer">
                    </div>
                </StepCard>
            </div>
        )
    }
}

export default ChartConfig;