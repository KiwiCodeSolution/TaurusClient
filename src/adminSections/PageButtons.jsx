import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import Button from "../components/UI/Button";
import { Add, Archive, Show } from "../icons/iconComponent";

const PageButtons = ({ buttons }) => {
  const location = useLocation();

  return (
    <div className="w-[914px] flex gap-x-6 mt-5 mx-auto">
      <Button style={"admin"}>
        <Link
          to={buttons[0].link}
          className={"flex gap-x-2 items-center nav-link"}
          state={{ from: location }}
        >
          <Add className={"fill-beige"} />
          <span>{buttons[0].label}</span>
        </Link>
      </Button>
      <Button style={"admin"}>
        <Link
          to={buttons[1].link}
          className={"flex gap-x-2 items-center nav-link"}
          state={{ from: location }}
        >
          <Archive className={"fill-beige"} /> <span>{buttons[1].label}</span>
        </Link>
      </Button>
      {buttons.length === 3 && (
        <Button style={"admin"}>
          <Link
            to={buttons[2].link}
            className={"flex gap-x-2 items-center nav-link"}
            state={{ from: location }}
          >
            <Show className={"fill-beige"} /> <span>{buttons[2].label}</span>
          </Link>
        </Button>
      )}
    </div>
  );
};

PageButtons.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PageButtons;
