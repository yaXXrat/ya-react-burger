import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RESET_ERROR_MESSAGE } from '../../services/actions/error'
import { ERASE_ORDER } from '../../services/actions/order';
import { ERASE_INGREDIENTS_ORDER } from '../../services/actions/constructor';


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
                    <Route path="/" exact={true}>
                        <MainPage />
                    </Route>
                    <Route path="/login" exact={true}>
                        <LoginPage />
                    </Route>
                    <Route path="/register" exact={true}>
                        <RegisterPage />
                    </Route>
                    <Route path="/forgot-password" exact={true}>
                        <ForgotPassPage />
                    </Route>
                    <Route path="/reset-password" exact={true}>
                        <ResetPassPage />
                    </Route>
                    <ProtectedRoute path="/profile" exact={true}>
                        <ProfilePage />
                    </ProtectedRoute>
                    <ProtectedRoute path="/profile/orders" exact={true}>
                        <ProfileOrdersPage />
                    </ProtectedRoute>
                    <Route path="/ingredients/:ingredientId" exact={true}>
                        <div className={'mt-25'}>
                            <IngredientDetails />
                        </div>
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
