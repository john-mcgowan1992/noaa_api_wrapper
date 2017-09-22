import React, { Component } from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { greenA400, greenA200, pink300 } from 'material-ui/styles/colors';

import Navbar from '../components/Navbar';
import Dashboard from './Dashboard';
import MapView from './MapView';
import ChartView from './ChartView';

import { connect } from 'react-redux';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: greenA200,
        primary2Color: greenA400,
        accent1Color: pink300
    }
})

class App extends Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="App">
                    <Router history={browserHistory} basename="/" >
                        <div className="viewContainer">
                            { this.props.uiState.showNavbar ? <Navbar/> : null }
                                <Route exact path="/" component={ Dashboard } />
                                <Route path="/map" component={ MapView } />
                                <Route path='/charts' component={ ChartView } />
                        </div>
                    </Router>
                </div>
            </MuiThemeProvider>
        )
    }
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(App);