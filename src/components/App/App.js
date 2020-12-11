import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router";
import Navbar from "@components/Navbar";
import Quiz from "@components/Quiz";
import TestList from "@components/TestList";
import AuthPage from "@components/AuthPage";
import CreateTest from "@components/CreateTest";
import Layout from "@components/hoc/Layout";
import {connect} from "react-redux";
import Logout from "@components/Logout/Logout";
import {autoLogin} from "@src/redux/actions";

class App extends Component {

    componentDidMount() {
        const {autoLogin} = this.props;
        autoLogin();
    }

    render() {
        const {isLoggedIn} = this.props;

        let routes = (<Switch>
                <Layout>
                    <Navbar/>
                    <Route path='/quiz/:id' component={Quiz}/>
                    <Route path='/auth' component={AuthPage}/>
                    <Route path='/' exact component={TestList}/>
                </Layout>
            </Switch>);

        if(isLoggedIn) {
            routes = (
                <Switch>
                    <Layout>
                        <Navbar/>
                        <Route path='/quiz/:id' component={Quiz}/>
                        <Route path='/create' component={CreateTest}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/' exact component={TestList}/>
                        <Redirect to='/' exact />
                    </Layout>
                </Switch>
            )
        }

        return routes;
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: !!state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);