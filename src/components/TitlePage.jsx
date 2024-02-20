import PropTypes from "prop-types";

const TitlePage = ({ children }) => {
  return <h1 className="w-full text-[53px] leading-[1.22] uppercase text-center text-base-yellow py-16">{children}</h1>;
};

TitlePage.propTypes = { children: PropTypes.node.isRequired };

export default TitlePage;
