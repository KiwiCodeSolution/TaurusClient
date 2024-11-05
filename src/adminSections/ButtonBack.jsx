import { Link, useLocation } from "react-router-dom";
import { ArrowBack } from "../icons/iconComponent";

const ButtonBack = () => {
  const location = useLocation();
  return (
    <Link
      className="flex gap-x-2 absolute top-8 left-8 back text-beige hover:text-base-yellow items-center"
      to={location?.state?.from.pathname ?? "/"}
    >
      <ArrowBack className={"fill-beige"} />
      Повернутись
    </Link>
  );
};

export default ButtonBack;
