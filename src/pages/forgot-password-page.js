import React, { useState, useEffect } from 'react'
import { forgot } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button}  from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import style from "./shared.module.css";

function ForgotPassPage() {
    const history = useHistory();

    const [userEmail, setUserEmail] = useState('')

    const { isLogged, user } = useSelector(store => store.auth);

    useEffect(() => {
        if(isLogged) {
            history.push("/")
        }
    }, [isLogged, history, user]);

    const dispatch = useDispatch();

    const onSubmitLoginForm = async (e) => {
        e.preventDefault();
        dispatch(forgot(userEmail, history));
 //       history.push("/reset-password");
    }

    return (
            <form
                className={style.form_block}
                onSubmit={onSubmitLoginForm}>
                <h2 className='mt-30 text text_type_main-medium'>Восстановление пароля</h2>

                <div className='mt-6 mb-6'>
                    <Input
                        onChange={(e) => setUserEmail(e.target.value)}
                        name='email'
                        value={userEmail}
                        type='email'
                        placeholder='Email'
                    />
                </div>
                <Button>Восстановить</Button>

                <div className='mt-25 text text_type_main-small text_color_inactive'>Вспомнили пароль?<Link className={`${style.link} pl-2`} to="/login">Войти</Link></div>
            </form>
    )
}

export default ForgotPassPage;
