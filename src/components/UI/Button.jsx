import PropTypes from "prop-types";

const buttonsStyle = {
  transparent:
    "w-[156px] h-[38px] px-3 py-[6px] border border-base-white text-base text-base-white hover:border-base-orange hover:text-base-orange",
  beige:
    "w-[156px] h-[38px] px-3 py-[6px] border border-beige text-base text-beige hover:border-base-orange hover:text-base-orange",
  contacts:
    "w-[156px] h-[38px] px-3 py-[6px] border border-base-white text-base text-base-white hover:border-base-orange hover:bg-base-orange hover:text-base-black",
  orange:
    "w-full md:w-[165px] h-[38px] px-6 py-[6px] bg-base-orange text-lg text-base-black mx-auto hover:bg-base-yellow disabled:opacity-25 disabled:opacity-25 disabled:hover:bg-base-orange",
  round: "w-12 h-12 md:w-8 md:h-8 rounded-full border border-base-beige hover:border-base-orange",
  count: "h-fill flex justify-center items-center",
  check: "w-30 px-4 text-base md:text-xl flex justify-center items-center h-[30px] rounded",
  gray: "w-fit h-[38px] py-[6px] px-3 bg-dark-btn-bg border border-beige text-16 text-beige flex items-center gap-x-2",
  admin:
    "w-fit h-[38px] py-[6px] px-3 border border-beige text-beige text-16 flex items-center gap-x-2 hover:border-base-orange hover:text-base-orange btn-admin",
  archive:
    "w-[96px] h-9 bg-dark-btn-bg border border-beige rounded-r-[3px] text-beige text-sm font-medium cursor-pointer hover:border-base-orange hover:text-base-orange flex justify-between items-center px-3",
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
  style: PropTypes.oneOf([
    "transparent",
    "contacts",
    "orange",
    "round",
    "count",
    "check",
    "gray",
    "admin",
    "beige",
    "archive",
  ]).isRequired,
  btnType: PropTypes.string,
  icon: PropTypes.element,
  clickFn: PropTypes.func,
  btnClass: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
