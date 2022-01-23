import React, { useEffect, useState, FC, FormEvent } from 'react'
import {useDispatch, useSelector} from "react-redux";

import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import style from './shared.module.css'

import { registerUser } from '../services/auth';

const RegisterPage: FC = () => {
    const history = useHistory()
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [userPass, setUserPass] = useState<string>('')

    const { isLogged } = useSelector((store: any) => store.auth);

    useEffect(() => {
        if(isLogged) {
            history.push("/")
        }
    }, [isLogged, history]);
  
    const dispatch = useDispatch();

    const onSubmitRegistrationForm = (e: FormEvent) => {
        e.preventDefault()
        dispatch(registerUser(userName, userEmail, userPass))
    }


    return (
        <form
            className={style.form_block}
            onSubmit={onSubmitRegistrationForm}>

            <h2 className="mt-30 text text_type_main-medium" >Регистрация</h2>
            <div className='mt-6'>
                <Input
                    placeholder="Имя"
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                />
            </div>
            <div className='mt-6'>
                <Input
                    onChange={(e) => setUserEmail(e.target.value)}
                    value={userEmail}
                    name={userEmail}
                    type={'email'}
                    placeholder={'Email'}
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
            <div className='mt-15 text_color_inactive text text_type_main-small'>Вы зарегистрированы? <Link className={`${style.link} pl-2`} to="/login">Войти</Link></div>

        </form>
    )
}

export default RegisterPage
