import React, { Component } from 'react';
import StepCard from './StepCard';
import { List, ListItem } from 'material-ui/List';

const cardStyle = {
    maxHeight: 700,
    width: 350,
    margin: 'auto'
}

class StationList extends Component {
    render() {
        return (
            <div className="StationList">
                <StepCard cardStyle={cardStyle} title="Select Station">
                    <List style={{textAlign: 'left'}}>
                        <div className="listContainer">
                            {
                                this.props.stations.map((station, index) => {
                                    return <ListItem primaryText={station.name} key={station.id} />
                                })
                            }
                        </div>
                    </List>
                </StepCard>
            </div>
        )
    }
}

export default StationList;