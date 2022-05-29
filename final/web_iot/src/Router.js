import React from 'react';
import {
    HashRouter,
    Switch,
    Route
  } from "react-router-dom";
import Home from './Component/Home';
import Login from './Component/Login';

export default function Router() {
    return (
        <HashRouter>
            <Switch>
                <Route exact path='/'>
                    <Login/>
                </Route>
                {/* <Route path='/test'>
                    <p>Test</p>
                </Route> */}
                <Route path='/home/:email'>
                    <Home/>
                </Route>
            </Switch>
        </HashRouter>
    )
}