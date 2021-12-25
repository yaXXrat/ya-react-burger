import React, { useState, useEffect } from 'react'
import { reset } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import {Input, Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import style from "./shared.module.css";
import {CLEAR_RESET_PASS_SUCCESS} from "../services/actions/auth";

function ResetPassPage() {
    const history = useHistory();

    const [userPassword, setUserPassword] = useState('');
    const [userToken, setUserToken] = useState('');

    const { isLogged, user, resetSuccess } = useSelector(store => store.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if(isLogged) {
            history.push("/")
        }
        if(resetSuccess){
            dispatch({type: CLEAR_RESET_PASS_SUCCESS});
            history.push("/login")
        }
    }, [isLogged, history, user, dispatch, resetSuccess]);


    const onSubmitLoginForm = async (e) => {
        e.preventDefault();
        dispatch(reset(userPassword, userToken, history));
        history.push("/login");
    }

    return (
            <form
                className={style.form_block}
                onSubmit={onSubmitLoginForm}>
                <h2 className='mt-30 text text_type_main-medium'>Восстановление пароля</h2>

                <div className='mt-6'>
                    <PasswordInput
                        onChange={(e) => setUserPassword(e.target.value)}
                        name={'email'}
                        value={userPassword}
                    />
                </div>
                <div className='mt-6 mb-6'>
                    <Input
                        onChange={(e) => setUserToken(e.target.value)}
                        name={'Token'}
                        value={userToken}
                        placeholder={'Введите код из письма'}
                    />
                </div>
                <Button>Сохранить</Button>

                <div className='mt-25 text text_type_main-small text_color_inactive'>Вспомнили пароль?<Link className={`${style.link} pl-2`} to="/login">Войти</Link></div>
            </form>
    )
}

export default ResetPassPage;
