import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { MainPage, LoginPage, ForgotPassPage, IngredientPage, ProfilePage, RegisterPage, ResetPassPage } from '../../pages';

import AppHeader from '../app-header/app-header';

function App() {
  return (
    <Router>
      <AppHeader />
      <Switch>
        <Route path="/" exact={true} >
          <MainPage />
        </Route>
        <Route path="/login" exact={true} >
          <LoginPage />
        </Route>
        <Route path="/register" exact={true} >
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact={true} >
          <ForgotPassPage />
        </Route>
        <Route path="/reset-password" exact={true} >
          <ResetPassPage />
        </Route>
        <Route path="/profile" exact={true} >
          <ProfilePage />
        </Route>
        <Route path="/ingredients/:id" exact={true} >
          <IngredientPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
