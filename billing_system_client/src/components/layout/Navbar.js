import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {clearCurrentProfile, logoutUser} from "../../actions/authActions";
import {navItems} from "./NavbarItems"
import isEmpty from "../../validation/is-empty";

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const items = navItems;


        const {isAuthenticated, user} = this.props.auth;
        console.log(items)
        const authLink =
            (<ul className="navbar-nav ml-auto">
                    {
                        items[isEmpty(user) ? "GUEST" : user.role[0].roleName].map(item =>
                            (<li className="nav-item">
                                <Link className="nav-link" to={item.path}>
                                    {item.name}
                                </Link>
                            </li>)
                        )}
                    <li className="nav-item">
                        <button
                            onClick={this.onLogoutClick.bind(this)}
                            className="nav-link logout"
                        > Logout
                        </button>
                    </li>
                </ul>
            );
        const guestLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className=" container">
                    <span className="navbar-brand">
                        Supermarket
                    </span>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">

                        {isAuthenticated ? authLink : guestLink}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStatetoProps = state => ({
    auth: state.auth
});
export default connect(
    mapStatetoProps,
    {logoutUser, clearCurrentProfile}
)(Navbar);
