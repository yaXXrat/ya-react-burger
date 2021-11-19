import style from "./display-error.module.css"
import PropTypes from "prop-types";
import classNames from 'classnames';
import errorIcon from '../../images/error.png';

const DisplayError = ({ error }) => {
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
                {error}
            </h3>
        </div>
    );
};

DisplayError.propTypes = {
    error: PropTypes.string
};
export default DisplayError;
