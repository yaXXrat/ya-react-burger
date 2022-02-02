import React, { useState, useEffect, FormEvent } from 'react'
import {useDispatch, useSelector} from "../services/hooks";
import {Input, Button, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    Link, useHistory
} from "react-router-dom";
import style from "./shared.module.css";
import {updateUser, logout, getUser} from "../services/auth";

function ProfilePage() {

    const { name, email} = useSelector(store => store.auth.user);
    const [userPassword, setUserPassword] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>(email);
    const [userName, setUserName] = useState<string>(name);
    const [userEdited, setUserEdited] = useState<boolean>(false);

    const history = useHistory();
    const { isLogged } = useSelector(store => store.auth);

    useEffect( () => {
        if(!isLogged) history.push("/login");
    }, [isLogged, history]);

    useEffect(() => {
        if(name === userName && userPassword === '' && email === userEmail)
            setUserEdited(false);
        else
            setUserEdited(true);
    }, [userName, userPassword, userEmail, email, name]);


    const resetUser = () => {
        setUserEmail(email);
        setUserName(name);
        setUserPassword('');
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const logoutUser = () => {
        dispatch(logout());
    }

    const onSubmitUpdateForm = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(updateUser(userName, userEmail, userPassword));
    }
    return (
        <div className={style.main_blocks}>
            <div className={style.block1}>
                <div className={'mb-6 text text_type_main-default'}>
                    <span>Профиль</span>
                </div>
                <div className={'mb-6 text text_type_main-default'}><Link to='/profile/orders' className={`${style["menu-link"]}`}>
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
                    />
                </div>
                { userEdited && <div className='text text_type_main-small text_color_inactive'><span className={`${style.link} pl-2`} onClick={() => resetUser()}>Отмена</span> <Button>Сохранить</Button></div>}
            </div>
            </form>
        </div>
    )
}

export default ProfilePage;
