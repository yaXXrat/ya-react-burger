import React, { useEffect } from 'react'
import {useDispatch, useSelector} from "../services/hooks";
import {
    Link, useHistory
} from "react-router-dom";
import style from "./shared.module.css";
import {logout} from "../services/auth";
import FeedList from "../components/feed-list/feed-list";
import {TOrdersState} from "../services/reducers/orders";
import {fetchOrdersByUser} from "../services/api";
import {wsClose} from "../services/actions/websocket";

function ProfileOrdersPage() {

    const history = useHistory();
    const { isLogged } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const orders = useSelector<TOrdersState>(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrdersByUser());
        return () => { dispatch(wsClose()) }
    }, [dispatch]);


    const logoutUser = () => {
        dispatch(logout());
    }


    useEffect( () => {
        if(!isLogged) history.push("/login");
    }, [isLogged, history]);


    return (
        <div className={style.main_blocks}>
            <div className={style.block1}>
                <div className={'mb-6 text text_type_main-default'}><Link to='/profile/' className={`${style["menu-link"]}`}>
                    Профиль
                </Link>
                </div>
                <div className={'mb-6 text text_type_main-default'}>
                    <span>История заказов</span>

                </div>
                <div className={'mb-6 text text_type_main-default'}><span className={`${style["menu-link"]}`} onClick={() => logoutUser()}>
                    Выход
                </span></div>
                <div className={'mt-10 text text_type_main-small text_color_inactive'} >В этом разделе вы можете <br/>посмотреть свою историю заказов</div>
            </div>
            <div className={style.block3}>
                <FeedList data={orders} view={'status'}/>
            </div>
        </div>
    )
}

export default ProfileOrdersPage;
