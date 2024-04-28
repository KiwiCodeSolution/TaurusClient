/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import useScrollBlock from "../../hooks/useScrollBlock";
import Button from "../../components/UI/Button";
import { Cross } from "../../icons/iconComponent";

const modalRoot = document.querySelector("#confirm-modal-admin-root");

const ConfirmModalAdmin = observer(
  ({ children, stylesPopUp, stylesOverlay, chancelFn, confirmFn }) => {
    const [blockScroll, allowScroll] = useScrollBlock();

    function closeModal() {
      chancelFn();
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
    }, [blockScroll, closeModal]);

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
          className={`w-[441px] h-[285px] p-10 bg-base-black border border-base-brown flex flex-col justify-between items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-100 ${stylesPopUp}`}
        >
          <button className="phoneContactList_button" onClick={closeModal}>
            <Cross className={"absolute top-[16px] right-[16px] icon"} />
          </button>
          {children}

          <div className="w-fit flex gap-x-5 mx-auto">
            <Button style={"orange"} clickFn={confirmFn}>
              Підтвердити
            </Button>
            <Button style={"transparent"} clickFn={closeModal}>
              Відмінити
            </Button>
          </div>
        </div>
      </div>,
      modalRoot
    );
  }
);

ConfirmModalAdmin.propTypes = {
  children: PropTypes.node.isRequired,
  chancelFn: PropTypes.func.isRequired,
  confirmFn: PropTypes.func.isRequired,
  stylesOverlay: PropTypes.string,
  stylesPopUp: PropTypes.string,
  componentName: PropTypes.string,
  type: PropTypes.string,
};

export default ConfirmModalAdmin;
