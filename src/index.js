import'@public/styles/bootstrap.min.css';
import 'material-icons/iconfont/material-icons.css';
import React from 'react';
import  { render } from 'react-dom';
import App from "@components/App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "@src/redux/store";

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

render(app,document.getElementById('root'));