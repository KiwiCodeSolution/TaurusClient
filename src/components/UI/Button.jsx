import PropTypes from "prop-types";

const buttonsStyle = {
  transparent:
    "w-[156px] h-[38px] px-3 py-[6px] border border-base-white text-base text-base-white hover:border-base-yellow hover:text-base-yellow",
  orange: "w-[150px] h-[38px] px-6 py-[6px] bg-base-orange text-lg text-base-back mx-auto hover:bg-base-yellow",
  round: "w-8 h-8 rounded-full border border-base-white  hover:border-base-yellow",
  count: "w-[71px] h-fill flex justify-center items-center",
};

const Button = ({ children, style, btnType, icon, clickFn, btnClass, disabled, ...restProps }) => {
  const handleClick = () => (clickFn ? clickFn() : null);
  const additionalStyle = btnClass || "";

  const currentStyle = `${buttonsStyle[style]} ${additionalStyle}`;

  return (
    <button
      type={btnType || "button"}
      className={currentStyle}
      onClick={handleClick}
      {...restProps}
      disabled={disabled}
    >
      {children}
      {icon}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.oneOf(["transparent", "orange", "round", "count"]).isRequired,
  btnType: PropTypes.string,
  icon: PropTypes.element,
  clickFn: PropTypes.func,
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
