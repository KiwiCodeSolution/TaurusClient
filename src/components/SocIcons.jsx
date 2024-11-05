import PropTypes from "prop-types";
import * as icons from "../icons/iconComponent";

const ITEMS = [
  { id: "1", Icon: icons.Insta, aria: "", name: "Instagram", link: "#" },
  { id: "2", Icon: icons.Fb, aria: "", name: "Facebook", link: "#" },
  { id: "3", Icon: icons.Telegram, aria: "", name: "Telegram", link: "#" },
];

const SocIcons = ({ section, className }) => {
  return (
    <>
      <div className={`flex ${section === "home" ? "flex-col gap-y-4" : "gap-x-4"} ${className}`}>
        {ITEMS.map(({ id, name, Icon, link }) => (
          <a key={id + name} href={link} className="social_link" target="_blank">
            <Icon />
          </a>
        ))}
      </div>
    </>
  );
};

SocIcons.propTypes = {
  section: PropTypes.string,
  className: PropTypes.string,
};

export default SocIcons;
