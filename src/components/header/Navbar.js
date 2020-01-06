import React, { Component } from "react";
import PropTypes from 'prop-types';
import Search from './Search';

const propTypes = {
    isMainShown: PropTypes.func,
};

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false
        }
    }

    onFocus(){
        return this.props.isMainShown();
    }
    render() {

        return (
            <>
            <div className="header">
            <header>
                <div className="wrapper">
                    <h1>TV SHOW</h1>
                    <div className="menuTrigger" onClick={() => this.setState({ showMenu: !this.state.showMenu })}>
                        <i className="fa fa-search " onClick={() => this.onFocus()} />
                    </div>
                    {this.state.showMenu ? <Search /> : ''}
                </div>
            </header>
            </div>
            </>
        );
    }
};

Navbar.propTypes = propTypes;
export default Navbar;