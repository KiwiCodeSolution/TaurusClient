import MenuItem from "../../components/MenuItem";
import MetaData from "../../components/MetaData";

import moment from "moment";

const Menu = () => {
  console.log("now--------------------", moment()._d);

  const timeString = "09:30"; // Ваше строкове значення часу

  const timeMoment = moment(timeString, "HH:mm");

  console.log("timeMoment", timeMoment._d);

  console.log(moment()._d < timeMoment);
  return (
    <>
      <MetaData>Меню ресторану</MetaData>

      <main className="relative w-full">
        <img src="/images/menu/menu.jpg" alt="" className="w-full h-[416px] object-cover" />
        <section className="wrapper w-full section-wrapper">
          <MenuItem />
        </section>
      </main>
    </>
  );
};

export default Menu;
