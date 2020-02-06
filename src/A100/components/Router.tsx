import React from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import IRouterState from '../model/Components/Router/IRouterState';
import IRouterProps from '../model/Components/Router/IRouterProps';
import Introducing from '../view/Introducing';
import MapView from '../view/MapView';


export default class Router extends React.Component<IRouterProps, IRouterState> {
    constructor(props: IRouterProps) {
        super(props);
    }

    render() {

        return (
            <Switch>
                <Route exact path='/' component={Introducing}>
                    <Redirect to="/map" />
                </Route>
                <Route path='/map' component={MapView} />
            </Switch>
        );
    }
}

