import { Link } from "react-router-dom";
import { LogoIcon } from "../../icons/iconComponent";

const Logo = () => {
  return (
    <Link to="/">
      <LogoIcon />
    </Link>
  );
};

export default Logo;
