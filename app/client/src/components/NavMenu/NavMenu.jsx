import React, { Component } from 'react';
import './NavMenu.css';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';

import Home from 'material-ui/svg-icons/action/home';
import Map from 'material-ui/svg-icons/maps/map';
import Timeline from 'material-ui/svg-icons/action/timeline';

class NavMenu extends Component {
    render() {
        return (
            <div>
                <Drawer docked={false} open={this.props.open} onRequestChange={this.props.toggleMenu}>
                    <AppBar title="Menu" style={{ backgroundColor: 'RGBA(226, 44, 47, .33)' }} showMenuIconButton={false} />
                    <Divider />
                    <Link to="/">
                        <MenuItem primaryText="Home" leftIcon={<Home/>} onTouchTap={this.props.toggleMenu} />
                    </Link>
                    <Link to="/map">
                        <MenuItem primaryText="Map" leftIcon={<Map/>} onTouchTap={this.props.toggleMenu} />
                    </Link>
                    <Link to='/charts'>
                        <MenuItem primaryText="Charts" leftIcon={<Timeline />} onTouchTap={this.props.toggleMenu} />
                    </Link>
                </Drawer>
            </div>
        )
    }
}

export default NavMenu;