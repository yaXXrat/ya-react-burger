import React, { useState } from 'react'
import {useDispatch, useSelector} from "react-redux";

import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import style from './shared.module.css'

import Modal from '../components/modal/modal';
import DisplayError from "../components/display-error/display-error";

import { RESET_ERROR_MESSAGE } from '../services/actions/error';

//import { registerUser } from '../services/actions/auth';

const RegisterPage = () => {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')

    const { errorMessage }  = useSelector(store => store.errorInfo);

    const dispatch = useDispatch();


    const onSubmitRegistrationForm = async (e) => {
        e.preventDefault()
        console.log('Create user')
//        dispatch(registerUser(userName, userEmail, userPass))
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