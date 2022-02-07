import React, { useState, useEffect, FC, FormEvent } from 'react'
import { login } from '../services/auth';
import {useDispatch, useSelector} from "../services/hooks";
import { Input, Button, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import style from "./shared.module.css";

const LoginPage: FC = () => {
    const history = useHistory();
    const [userEmail, setUserEmail] = useState<string>('');
    const [userPass, setUserPassword] = useState<string>('');

    const { isLogged } = useSelector(state => state.auth);
    const dest = history?.location?.state?.from || "/";

    useEffect(() => {
         if(isLogged) {
             history.push(dest);
         }
    }, [isLogged, history, dest]);

    const dispatch = useDispatch();
    const onSubmitLoginForm = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(login(userEmail, userPass));
    }

    return (
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
    )
}

export default LoginPage
