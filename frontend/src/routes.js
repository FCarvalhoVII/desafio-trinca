import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BarbecuesList from './pages/BarbecuesList';
import ContributorsList from './pages/ContributorsList';
import CreateBarbecue from './pages/CreateBarbecue';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/barbecues' component={BarbecuesList} />
                <Route path='/addBarbecue' component={CreateBarbecue} />
                <Route path='/contributors/:barbecueId' component={ContributorsList} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;