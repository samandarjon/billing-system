import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import TextFieldGroup from "../comman/TextFieldGroup";
import {loginUser} from "../../actions/authActions";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const {user} = this.props.auth
        if (this.props.auth.isAuthenticated) {
            if (user.role[0].roleName === "ROLE_ADMIN") {
                this.props.history.push("/billing")
            }
            if (user.role[0].roleName === "ROLE_MANAGER") {
                this.props.history.push("/product")
            }
            if (user.role[0].roleName === "ROLE_SELLER") {
                this.props.history.push("/seller")
            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("");
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    }

    onChange(e) {
        this.setState({errors: ""})
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors} = this.state;
        console.log(errors);
        console.log(this.props.errors);
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Supermarket tizimiga kirish uchun username va parolni kiriting.
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Username"
                                    name="username"
                                    type="text"
                                    value={this.state.username}
                                    onChange={this.onChange}
                                    required={true}
                                    error={errors.username ? errors.username : errors.message}
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                    required={true}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {loginUser}
)(Login);
