import React, { useState, useEffect } from 'react'
import { login } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import style from "./shared.module.css";
import { RESET_ERROR_MESSAGE } from '../services/actions/error';
import Modal from '../components/modal/modal';
import DisplayError from "../components/display-error/display-error";

const LoginPage = () => {
    const history = useHistory()
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPassword] = useState('')

    const { errorMessage }  = useSelector(store => store.errorInfo);
    const { isLogged, user } = useSelector(store => store.auth);

    useEffect(() => {
        if(isLogged) {
            console.log(JSON.stringify(user))
            history.push("/")
        }
    }, [isLogged, history, user]);
  
    const dispatch = useDispatch();

    const onSubmitLoginForm = async (e) => {
        e.preventDefault()
        dispatch(login(userEmail, userPass))
    }

    const hideDisplayError = () => {
        dispatch({type: RESET_ERROR_MESSAGE});
    };

    return (
    <>
        <form 
        className={style.form_block}
        onSubmit={onSubmitLoginForm}>
            <h2 className='mt-30 text text_type_main-medium'>Вход</h2>

            <div className='mt-6'>
                <Input
                onChange={(e) => setUserEmail(e.target.value)} 
                name={'email'}
                type={'email'}
                placeholder={'Email'}
                value={userEmail} 
                />
                </div>
            <div className='mt-6 mb-6'>
                <PasswordInput 
                onChange={(e) => setUserPassword(e.target.value)} 
                name='password' 
                value={userPass} 
                />
                </div>
            <Button>Войти</Button>

            <div className='mt-25 text text_type_main-small text_color_inactive'>Вы — новый пользователь?<Link className={`${style.link} pl-2`} to="/register">Зарегистрироваться</Link></div>
            <div className='mt-4 text text_type_main-small text_color_inactive'>Забыли пароль? <Link className={`${style.link} pl-2`} to="/forgot-password">Восстановить пароль</Link></div>
        </form>
        { errorMessage && (
            <Modal onClose={hideDisplayError} className={style['error-modal']}>
              <DisplayError />
            </Modal>
        )}
    </>
    )
}

export default LoginPage
