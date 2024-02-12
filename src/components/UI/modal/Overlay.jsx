import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import useScrollBlock from "../../../hooks/useScrollBlock";

const modalRoot = document.querySelector("#modal-root");

const Overlay = ({ children, clickFn }) => {
  const [allowScroll] = useScrollBlock();

  useEffect(() => {
    function keyDown(e) {
      if (e.code !== "Escape") {
        return;
      }
      allowScroll();
      clickFn(false);
    }
    window.addEventListener("keydown", keyDown);
    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [allowScroll, clickFn]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      clickFn();
    }
    return;
  }

  return createPortal(
    <div
      className="fixed inset-0 w-full h-screen bg-[rgb(0,0,0,0.35)] z-[100] top-0 backdrop-blur"
      onClick={handleOverlayClick}
    >
      {children}
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
