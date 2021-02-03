import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {AuthPage} from './Pages/AuthPage';
import {PlanerPage} from './Pages/PlanerPage';
export const useRoutes = (isAuthenticated) => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/planer" exact>
                    <PlanerPage />
                </Route>
                <Redirect to="/planer"></Redirect>
            </Switch>
        )
    }else{
        return(
<Switch>
    <Route path="/login">
<AuthPage />
    </Route>
    <Redirect to="/login"></Redirect>
</Switch>
        )
    }
}