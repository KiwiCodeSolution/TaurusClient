import PropTypes from "prop-types";

const TitlePage = ({ children }) => {
  return (
    <h1 className="w-full text-[32px] xl:text-[53px] leading-[1.22] uppercase text-center text-base-yellow mb-8 xl:mb-16">
      {children}
    </h1>
  );
};

TitlePage.propTypes = { children: PropTypes.node.isRequired };

export default TitlePage;
