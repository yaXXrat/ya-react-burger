import { useEffect } from "react";
import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
  useEffect(() => {
    window.addEventListener("keydown", onClose);
    return () => {
      window.removeEventListener("keydown", onClose);
    };
  }, [onClose]);

  const handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose();
    }
  };

  const onModalClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <div
      className={style.open}
      onClick={(e) => onModalClose(e)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;