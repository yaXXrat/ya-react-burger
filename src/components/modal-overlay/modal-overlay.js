import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {

  const onModalClose = (e) => {
    if (e.target === e.currentTarget) {
      if(typeof onClose === 'function') onClose(e);
    }
  };

  return (
    <div
      className={style.open}
      onClick={(e) => onModalClose(e)}
    />
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.any,
};
export default ModalOverlay;
