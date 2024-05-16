import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";

import { Archive, ArrowBack } from "../../icons/iconComponent";
import PageButtons from "../../adminSections/PageButtons";
import UserItem from "../../adminSections/UserItem";

const buttons = [
  { label: "Додати користувача", link: "/admin/access/users/create" },

  { label: "Архів", link: "/admin/access/users/archive" },
];

const UsersPage = observer(() => {
  return (
    <>
      <MetaData>Адміністрування</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Адміністрування</TitlePage>
        <PageButtons buttons={buttons} />

        <div className="w-[916px] h-[37px] py-2 pl-2 pr-[56px] flex mx-auto items-center gap-x-6 justify-between bg-base-brown text-beige text-14 mt-[15px]">
          <p className="w-[183px]">Користувач</p>
          <p className="w-[160px]">Логін користувача</p>
          <p className="w-[132px]">Тип доступу</p>
          <p className="w-[101px] text-center">Призупинити доступ</p>
          <p className="w-[83px]">Редагувати</p>
          <p className="w-[73px]">Видалити</p>
        </div>
        <div className="w-full h-[calc(100%-400px)] mx-auto overflow-y-auto pt-[18px] px-8">
          <UserItem />
        </div>
      </section>
    </>
  );
});

export default UsersPage;
