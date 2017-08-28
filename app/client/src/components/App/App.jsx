import React, { Component } from 'react';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { greenA400, greenA200, pink300 } from 'material-ui/styles/colors';
import './App.css';

import Navbar from '../Navbar/Navbar.jsx';
import Dashboard from '../Dashboard/Dashboard.jsx';

import { connect } from 'react-redux';
import { fetchGSOMData } from '../../containers/actions';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: greenA200,
        primary2Color: greenA400,
        accent1Color: pink300
    }
})

class App extends Component {

    componentDidMount() {
        // const { dispatch } = this.props;
        // dispatch(fetchGSOMData());
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="App">
                    <Router routerHistory={browserHistory} basename="/" >
                        <div className="routeContainer">
                            <Navbar />
                            <div className="viewContainer">
                                <Route exact path="/" component={ Dashboard } />
                            </div>
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