import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import NavMenu from '../NavMenu/NavMenu.jsx';

class Navbar extends Component {
    constructor() {
        super()
        this.state = { open: false }
    }

    toggleMenu() {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div className="Navbar">
                <AppBar title="Climate Charts" onLeftIconButtonTouchTap={ this.toggleMenu.bind(this) }>
                </AppBar>
                <NavMenu open={this.state.open} toggleMenu={this.toggleMenu.bind(this)} />
            </div>
        )
    }
}

export default Navbar;