import PropTypes from "prop-types";

const PopUp = ({ children, clickFn }) => {
  return (
    <div className="w-[572px] h-[319px] p-10 text-16 text-lite-yellow relative">
      <button onClick={clickFn} className="absolute top-2 right-2 bg-slate-600">
        Close
      </button>
      {children}
    </div>
  );
};

PopUp.propTypes = {
  children: PropTypes.node.isRequired,
  clickFn: PropTypes.func.isRequired,
};

export default PopUp;
