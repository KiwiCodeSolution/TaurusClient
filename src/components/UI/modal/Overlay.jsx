/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import useScrollBlock from "../../../hooks/useScrollBlock";
import Button from "../Button";
import { Cross } from "../../../icons/iconComponent";

const modalRoot = document.querySelector("#modal-root");

const Overlay = ({ children, clickFn, stylesPopUp, stylesOverlay, componentName, status }) => {
  const [blockScroll, allowScroll] = useScrollBlock();

  function closeModal() {
    clickFn();
    allowScroll();
  }

  useEffect(() => {
    blockScroll();
    function keyDown(e) {
      if (e.code !== "Escape") {
        return;
      }
      closeModal();
    }
    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [blockScroll, clickFn, closeModal]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
    return;
  }

  return createPortal(
    <div
      className={`${stylesOverlay} fixed inset-0 w-full h-screen bg-[rgb(0,0,0,0.35)] z-[100] top-0 backdrop-blur`}
      onClick={handleOverlayClick}
    >
      <div
        className={`p-10 text-16 text-lite-yellow bg-base-back border border-base-brown absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 ${stylesPopUp}`}
      >
        <button className="phoneContactList_button" onClick={closeModal}>
          <Cross className={"absolute top-[16px] right-[16px] icon"} />
        </button>
        {children}
        {componentName !== "PhoneContactList" && status === "confirm" && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <Button style={"orange"} onClick={closeModal}>
              Закрити
            </Button>
          </div>
        )}
      </div>
    </div>,
    modalRoot
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  clickFn: PropTypes.func.isRequired,
  stylesOverlay: PropTypes.string,
  stylesPopUp: PropTypes.string,
  componentName: PropTypes.string,
  status: PropTypes.string,
  type: PropTypes.string,
};

export default Overlay;
