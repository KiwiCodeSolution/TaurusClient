import MenuItem from "../../components/MenuItem";
import MetaData from "../../components/MetaData";

const Menu = () => {
  return (
    <>
      <MetaData>Меню ресторану</MetaData>

      <main className="relative w-full">
        <img src="/images/menu/menu.jpg" alt="" className="w-full h-[416px] object-cover" />
        <section className="wrapper w-full">
          <MenuItem />
        </section>
      </main>
    </>
  );
};

export default Menu;
