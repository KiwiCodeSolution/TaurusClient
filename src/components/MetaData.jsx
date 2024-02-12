import PropTypes from "prop-types";
import { HelmetProvider, Helmet } from "react-helmet-async";

const MetaData = ({ children, description }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{children}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
    </HelmetProvider>
  );
};

MetaData.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
};

export default MetaData;
