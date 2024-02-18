import PropTypes from "prop-types";
import { LocationIcon } from "../icons/iconComponent";
import { location } from "../helpers/contacts";

const Location = ({ section, className }) => {
  return (
    <address className="not-italic">
      <a
        href="https://maps.app.goo.gl/rEBJVohGT41p9Ufb9"
        target="_blank"
        className={`${
          section === "home" ? "rotate-90 hover:underline gap-x-3" : "gap-x-[6px]"
        } ${className} flex not-italic hover:text-base-yellow hover:cursor-pointer location`}
      >
        {section === "home" ? (
          <LocationIcon section={"home"} />
        ) : (
          <div className="w-6 pt-1">
            <LocationIcon />
          </div>
        )}

        <span>{location}</span>
      </a>
    </address>
  );
};

Location.propTypes = {
  section: PropTypes.string,
  className: PropTypes.string,
};

export default Location;
