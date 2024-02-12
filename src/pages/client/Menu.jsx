import MetaData from "../../components/MetaData";
import PhoneContactList from "../../components/PhoneContactList";

const Menu = () => {
  return (
    <>
      <MetaData>Меню ресторану</MetaData>

      <section className="relative w-full h-full">
        <img src="/images/menu/menu.jpg" alt="" className="w-full h-[416px] object-cover" />

        <PhoneContactList />
      </section>
    </>
  );
};

export default Menu;
