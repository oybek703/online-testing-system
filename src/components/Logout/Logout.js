import React, {Component} from 'react';
import {Redirect} from "react-router";
import {connect} from "react-redux";
import {logout} from "@src/redux/actions";

class Logout extends Component {
    componentDidMount() {
        const {logoutFromApp} = this.props;
        logoutFromApp();
    }
    render() {
        return (
         <Redirect to='/' exact/>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutFromApp: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);