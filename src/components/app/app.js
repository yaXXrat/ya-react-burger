import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ERROR_MESSAGE } from '../../services/actions/error'
import { RESET_CURRENT_INGREDIENT } from '../../services/actions/ingredient';
import { ERASE_ORDER } from '../../services/actions/order';
import { ERASE_INGREDIENTS_ORDER } from '../../services/actions/constructor';


import { MainPage, LoginPage, ForgotPassPage, IngredientPage, ProfilePage, RegisterPage, ResetPassPage } from '../../pages';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/actions/ingredients';
import DisplayError from "../display-error/display-error";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import DisplayWaiting from "../display-waiting/display-waiting";
import style from "./app.module.css";



function App() {
  const dispatch = useDispatch();
  const { errorMessage }  = useSelector(store => store.errorInfo);
  const { selectedIngredient }  = useSelector(store => store.burgerIngredient);
  const orderCreated = useSelector(store => store.order.orderCreated);
  const isWaitingIngredients  = useSelector(store => store.burgerIngredients.isLoading);
  const isWaitingOrder = useSelector(store => store.order.isLoading);
  const isWaiting = isWaitingIngredients || isWaitingOrder;

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  const hideDisplayError = () => {
    dispatch({type: RESET_ERROR_MESSAGE});
  };
  const hideIngredientInfo = () => {
    dispatch({type: RESET_CURRENT_INGREDIENT})
  };

  const hideOrderInfo = () => {
    dispatch({type: ERASE_ORDER});
    dispatch({type: ERASE_INGREDIENTS_ORDER});
  };


  return (
    <>
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
    { errorMessage && (
      <Modal onClose={hideDisplayError} className={style['error-modal']}>
        <DisplayError />
      </Modal>
    )}
      { selectedIngredient && (
      <Modal onClose={hideIngredientInfo} className={style['ingredient-modal']}>
        <IngredientDetails />
      </Modal>
      )}
      { orderCreated && (
      <Modal onClose={hideOrderInfo} className={style['order-modal']}>
        <OrderDetails />
      </Modal>
      )}
      { isWaiting && (
        <Modal className={style['error-modal']}>
          <DisplayWaiting />
        </Modal>
      )}
  </>  
  );
}

export default App;
