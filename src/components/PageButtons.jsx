import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import Button from "./UI/Button";
import { Add, Archive, Show } from "../icons/iconComponent";

const PageButtons = ({ buttons }) => {
  const location = useLocation();

  return (
    <div className="w-[914px] flex gap-x-6 mt-5 mx-auto">
      <Button style={"admin"}>
        <Link
          to={buttons[0].link}
          className={"flex gap-x-2 items-center"}
          state={{ from: location }}
        >
          <Add className={"fill-beige"} /> {buttons[0].label}
        </Link>
      </Button>
      <Button style={"admin"}>
        <Link
          to={buttons[1].link}
          className={"flex gap-x-2 items-center"}
          state={{ from: location }}
        >
          <Archive className={"fill-beige"} /> {buttons[1].label}
        </Link>
      </Button>
      <Button style={"admin"}>
        <Link
          to={buttons[2].link}
          className={"flex gap-x-2 items-center"}
          state={{ from: location }}
        >
          <Show /> {buttons[2].label}
        </Link>
      </Button>
    </div>
  );
};

PageButtons.propTypes = {
  buttons: PropTypes.shape({
    link: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  type: PropTypes.string,
};

export default PageButtons;
