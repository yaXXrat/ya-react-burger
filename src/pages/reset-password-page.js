import React, { useState, useEffect } from 'react'
import { reset } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import {Input, Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import style from "./shared.module.css";
import { RESET_ERROR_MESSAGE } from '../services/actions/error';
import Modal from '../components/modal/modal';
import DisplayError from "../components/display-error/display-error";


function ResetPassPage() {
    const history = useHistory();

    const [userPassword, setUserPassword] = useState('');
    const [userToken, setUserToken] = useState('');

    const { errorMessage }  = useSelector(store => store.errorInfo);
    const { isLogged, user } = useSelector(store => store.auth);

    useEffect(() => {
        if(isLogged) {
            history.push("/")
        }
    }, [isLogged, history, user]);

    const dispatch = useDispatch();

    const onSubmitLoginForm = async (e) => {
        e.preventDefault();
        dispatch(reset(userPassword, userToken, history));
        //       history.push("/reset-password");
    }

    const hideDisplayError = () => {
        dispatch({type: RESET_ERROR_MESSAGE});
    };

    return (
        <>
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
            { errorMessage && (
                <Modal onClose={hideDisplayError} className={style['error-modal']}>
                    <DisplayError />
                </Modal>
            )}
        </>
    )
}

export default ResetPassPage;
