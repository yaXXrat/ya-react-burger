import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Input, Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link
} from "react-router-dom";
import style from "./shared.module.css";
import {updateUser, logout} from "../services/auth";

function ProfilePage() {

    const { name, email, password } = useSelector(store => store.auth.user);
    const [userPassword, setUserPassword] = useState(password);
    const [userEmail, setUserEmail] = useState(email);
    const [userName, setUserName] = useState(name);
    const [userEdited, setUserEdited] = useState(false);

    useEffect(() => {
        if(name === userName && password === userPassword && email === userEmail)
            setUserEdited(false);
        else
            setUserEdited(true);
    }, [userName, userPassword, userEmail, email, name, password]);


    const resetUser = () => {
        setUserEmail(email);
        setUserName(name);
        setUserPassword(password);
    }

    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(logout());
    }

    const onSubmitUpdateForm = () => {
        dispatch(updateUser(userName, userEmail, userPassword));
    }
    return (
        <div className={style.main_blocks}>
            <div className={style.block1}>
                <div className={'mb-6 text text_type_main-default'}>
                    <span>Профиль</span>
                </div>
                <div className={'mb-6 text text_type_main-default'}><Link to='/history' className={`${style["menu-link"]}`}>
                    История заказов
                    </Link>
                </div>
                <div className={'mb-6 text text_type_main-default'}><span className={`${style["menu-link"]}`} onClick={() => logoutUser()}>
                    Выход
                </span></div>
                <div className={'mt-10 text text_type_main-small text_color_inactive'} >В этом разделе вы можете изменить свои персональные данные</div>
            </div>
            <form
                onSubmit={onSubmitUpdateForm}>
            <div className={style.block2}>
                <div>
                    <Input
                        onChange={(e) =>  setUserName(e.target.value)}
                        name={'name'}
                        value={userName}
                        placeholder={'Имя'}
                        icon={'EditIcon'}
                    />
                </div>
                <div className='mt-6'>
                    <Input
                        onChange={(e) => setUserEmail(e.target.value)}
                        name={'email'}
                        value={userEmail}
                        placeholder={'Логин'}
                        icon={'EditIcon'}
                        type={'email'}
                    />
                </div>
                <div className='mt-6 mb-6'>
                    <PasswordInput
                        onChange={(e) => setUserPassword(e.target.value)}
                        name={'password'}
                        value={userPassword}
                        icon={'EditIcon'}
                        type={'password'}
                        placeholder={'Пароль'}
                    />
                </div>
                { userEdited && <div className='text text_type_main-small text_color_inactive'><span className={`${style.link} pl-2`} onClick={() => resetUser()}>Отмена</span> <Button>Сохранить</Button></div>}
            </div>
            </form>
        </div>
    )
}

export default ProfilePage;
