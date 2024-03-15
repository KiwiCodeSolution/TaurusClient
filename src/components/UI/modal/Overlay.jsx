/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import useScrollBlock from "../../../hooks/useScrollBlock";

const modalRoot = document.querySelector("#modal-root");

const Overlay = ({ children, clickFn }) => {
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
      className="fixed inset-0 w-full h-screen bg-[rgb(0,0,0,0.35)] z-[100] top-0 backdrop-blur"
      onClick={handleOverlayClick}
    >
      <div className="w-[572px] h-[319px] p-10 text-16 text-lite-yellow bg-base-back border border-base-brown absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button onClick={closeModal} className="absolute top-2 right-2 bg-slate-600">
          Close
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  clickFn: PropTypes.func.isRequired,
  overlayClass: PropTypes.string,
  type: PropTypes.string,
};

export default Overlay;
