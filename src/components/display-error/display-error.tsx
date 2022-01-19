import style from "./display-error.module.css"
import classNames from 'classnames';
import errorIcon from '../../images/error.png';
import {useSelector} from "react-redux";

const DisplayError = () => {

    const error = useSelector<any>(store => store.errorInfo.errorMessage)
    return (
        <div className={classNames(style['order-details'])}>
            <h2 className={classNames(style['order-h2'], 'text', 'text_type_main-large')}>
                Упс...
            </h2>
            <div className={classNames('text','text_type_main-default')}>
                Что-то пошло не так
            </div>
            <img src={errorIcon} alt="Произошла ошибка" className={style.error}/>
            <h3 className={classNames('text','text_type_main-default', ' text_color_inactive')}>
                {error as string}
            </h3>
        </div>
    );
};

export default DisplayError;
