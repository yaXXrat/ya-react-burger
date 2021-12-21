import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";

import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import style from './shared.module.css'

import Modal from '../components/modal/modal';
import DisplayError from "../components/display-error/display-error";

import { SET_ERROR_MESSAGE, RESET_ERROR_MESSAGE } from '../services/actions/error';
import { REGISTER_SUCCESS } from '../services/actions/auth';

import { registerUser } from '../services/auth';

const RegisterPage = () => {
    const history = useHistory()
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')

    const { errorMessage }  = useSelector(store => store.errorInfo);

    const dispatch = useDispatch();

    const onSubmitRegistrationForm = async (e) => {
        e.preventDefault()
        let result = await registerUser(userName, userEmail, userPass)
        if (result.success) {
            dispatch({type: REGISTER_SUCCESS, user: result.user});
            history.push("/")
        } else {
            dispatch({type: SET_ERROR_MESSAGE, errorMessage: result.message});
        }
    }

    const hideDisplayError = () => {
        dispatch({type: RESET_ERROR_MESSAGE});
      };
  

    return (
        <>
        <form
            className={style.form_block}
            onSubmit={onSubmitRegistrationForm}>

            <h2 className="mt-30" >Регистрация</h2>
            <div className='mt-6'>
                <Input
                    placeholder="Имя"
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                />
            </div>
            <div className='mt-6'>
                <EmailInput
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    name={userEmail}
                />
            </div>
            <div className='mt-6 mb-6'>
                <PasswordInput
                    onChange={(e) => setUserPass(e.target.value)}
                    value={userPass}
                    name={userPass}
                />
            </div>

            <Button >Зарегистрироваться</Button>
            <div className='mt-15 text_color_inactive'>Вы зарегистрированы? <Link className={`${style.link} pl-2`} to="/login">Войти</Link></div>

        </form>

        { errorMessage && (
        <Modal onClose={hideDisplayError} className={style['error-modal']}>
          <DisplayError />
        </Modal>
        )}
  
        </>
    )
}

export default RegisterPage