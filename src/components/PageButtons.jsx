import { Link, useLocation } from "react-router-dom";
import Button from "./UI/Button";
import { Add, Archive, Show } from "../icons/iconComponent";

const PageButtons = () => {
  const location = useLocation();

  return (
    <div className="w-[914px] flex gap-x-6 mt-5 mx-auto">
      <Button style={"admin"}>
        <Link
          to="/admin/access/site/menu/create"
          className={"flex gap-x-2 items-center"}
          state={{ from: location }}
        >
          <Add className={"fill-beige"} /> Додати позицію
        </Link>
      </Button>
      <Button style={"admin"}>
        <Link
          to="/admin/access/site/menu/archive"
          className={"flex gap-x-2 items-center"}
          state={{ from: location }}
        >
          <Archive className={"fill-beige"} /> Архів
        </Link>
      </Button>
      <Button style={"admin"}>
        <Link
          to="/admin/access/site/menu/hide"
          className={"flex gap-x-2 items-center"}
          state={{ from: location }}
        >
          <Show /> Переглянути приховані
        </Link>
      </Button>
    </div>
  );
};

export default PageButtons;
