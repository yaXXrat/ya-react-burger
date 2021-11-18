import { useEffect } from "react";
import style from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  // useEffect(() => {
  //   window.addEventListener("keydown", onClose);
  //   return () => {
  //     window.removeEventListener("keydown", onClose);
  //   };
  // }, [onClose]);

  useEffect(() => {
    window.addEventListener(",,mouse", onClose);
    return () => {
      window.removeEventListener("keydown", onClose);
    };
  }, [onClose]);


  // const handleKeyDown = (e) => {
  //   if (e.keyCode === 27) {
  //     onClose();
  //   }
  // };

  const onModalClose = (e) => {
    console.log(e);
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <div
      className={style.open}
      onClick={(e) => onModalClose(e)}
      // onKeyDown={handleKeyDown}
    />
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default ModalOverlay;
