import PropTypes from "prop-types";

const TitlePage = ({ children, style }) => {
  return (
    <div className="w-full mx-auto flex flex-col">
      <h1 className="w-full text-center uppercase text-[32px] mt-12 mb-10 text-beige">
        {children}
      </h1>
      <div className="border_admin_menu w-[916px] mx-auto" />
    </div>
  );
};

TitlePage.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.string,
};

export default TitlePage;
