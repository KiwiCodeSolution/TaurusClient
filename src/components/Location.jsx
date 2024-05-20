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
          section === "home"
            ? "rotate-90 hover:underline gap-x-3"
            : section === "contacts"
            ? "gap-x-[6px] items-center justify-center w-full md:w-[200px]"
            : section === "home_mobile"
            ? "gap-x-3 items-center"
            : ""
        } ${className} flex not-italic text-sm location`}
      >
        {section === "home" ? (
          <LocationIcon section={"home"} />
        ) : (
          <div className="w-6 pt-1">
            <LocationIcon section={section} />
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
