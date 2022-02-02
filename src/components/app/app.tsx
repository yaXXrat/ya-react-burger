import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MainPage, LoginPage, ForgotPassPage, ProfilePage, RegisterPage, ResetPassPage, ProfileOrdersPage } from '../../pages';
import ProtectedRoute from '../protected-route';
import AppHeader from '../app-header/app-header';
import { getIngredients } from '../../services/api';
import DisplayError from "../display-error/display-error";
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import DisplayWaiting from "../display-waiting/display-waiting";
import style from "./app.module.css";
import {RESET_ERROR_MESSAGE} from "../../services/constants/error";
import {ERASE_ORDER} from "../../services/constants/order";
import {ERASE_INGREDIENTS_ORDER} from "../../services/constants/constructor";

function App() {
    const dispatch = useDispatch();

    const errorMessage = useSelector<any>(store => store.errorInfo.errorMessage);
    const orderCreated = useSelector<any>(store => store.order.orderCreated);
    const isWaitingIngredients  = useSelector<any>(store => store.burgerIngredients.isLoading);
    const isWaitingOrder = useSelector<any>(store => store.order.isLoading);
    const isWaiting = isWaitingIngredients || isWaitingOrder;

    useEffect(() => {
        dispatch(getIngredients())
    }, [dispatch]);

    const hideDisplayError = () => {
        dispatch({type: RESET_ERROR_MESSAGE});
    };

    const hideOrderInfo = () => {
        dispatch({type: ERASE_ORDER});
        dispatch({type: ERASE_INGREDIENTS_ORDER});
    };


    const ModalSwitch = () => {
        const location = useLocation();
        const state = location.state as any;
        const history = useHistory();
        let background = state && state.background;
        const handleModalClose = () => {
            history.goBack();
        };

        return (
            <>
                <AppHeader />
                <Switch location={background || location}>
                    <Route path="/login" >
                        <LoginPage />
                    </Route>
                    <Route path="/register" >
                        <RegisterPage />
                    </Route>
                    <Route path="/forgot-password" >
                        <ForgotPassPage />
                    </Route>
                    <Route path="/reset-password" >
                        <ResetPassPage />
                    </Route>
                    <ProtectedRoute path="/profile" >
                        <ProfilePage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" >
                        <ProfileOrdersPage />
                    </ProtectedRoute>
                    <Route path="/ingredients/:ingredientId" >
                        <div className={'mt-25'}>
                            <IngredientDetails />
                        </div>
                    </Route>
                    <Route path="/" >
                        <MainPage />
                    </Route>
                </Switch>

                {background && (
                    <Route
                        path='/ingredients/:ingredientId'
                        children={
                            <Modal onClose={handleModalClose}>
                                <IngredientDetails />
                            </Modal>
                        }
                    />
                )}
            </>
        );
    };

    return (
        <>
            <Router>
                <ModalSwitch />
            </Router>
            { errorMessage && (
                <Modal onClose={hideDisplayError} className={style['error-modal']}>
                    <DisplayError />
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
