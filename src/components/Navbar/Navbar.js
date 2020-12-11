import React, {Fragment} from "react";
import {NavLink, Redirect} from "react-router-dom";
import {connect} from "react-redux";

const Navbar = ({isLoggedIn}) => {
    return (
        <ul className='list-inline d-flex mt-5'>
            <li className='list-inline-item'>
                <NavLink
                    to='/'
                    exact
                    className='btn btn-outline-info text-white px-sm-3 px-md-5'
                    activeClassName='btn-info'>
                        Tests
                </NavLink>
            </li>
            {
                !isLoggedIn && (
                    <li className='list-inline-item'>
                        <NavLink
                            to='/auth'
                            exact
                            className='btn btn-outline-info text-white px-sm-3 px-md-5'>
                            Auth
                        </NavLink>
                    </li>
                )
            }
            {
                isLoggedIn
                    ? (
                    <Fragment>
                        <li className='list-inline-item'>
                            <NavLink
                                to='/create'
                                exact
                                className='btn btn-outline-info text-white px-sm-3 px-md-5'>
                                Create test
                            </NavLink>
                        </li>
                        <li className='list-inline-item'>
                            <NavLink
                            to='/logout'
                            exact
                            className='btn btn-outline-info text-white px-sm-3 px-md-5'>
                            Logout
                            </NavLink>
                        </li>
                    </Fragment>
                )
                    : (
                        <Redirect to='/'/>
                )
            }
        </ul>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Navbar);