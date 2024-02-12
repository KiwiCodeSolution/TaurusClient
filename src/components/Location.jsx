import PropTypes from "prop-types";
import { LocationIcon } from "../icons/iconComponent";

const Location = ({ section, className }) => {
  return (
    <address className="not-italic">
      <a
        href="https://maps.app.goo.gl/rEBJVohGT41p9Ufb9"
        target="_blank"
        className={`${
          section === "home" ? "rotate-90" : ""
        } ${className} flex gap-x-3 not-italic hover:text-base-yellow hover:underline hover:cursor-pointer location`}
      >
        <LocationIcon />
        <span>м. Харків, вул. 23-го Серпня, 39</span>
      </a>
    </address>
  );
};

Location.propTypes = {
  section: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Location;
