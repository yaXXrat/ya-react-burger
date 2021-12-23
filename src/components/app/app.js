import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import { MainPage, LoginPage, ForgotPassPage, IngredientPage, ProfilePage, RegisterPage, ResetPassPage } from '../../pages';

import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

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
