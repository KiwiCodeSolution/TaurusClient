import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";
import UserItem from "../../adminSections/UserItem";
import usersStore from "../../store/users";
import Loader from "../../components/Loader";
import useAuthPage from "../../hooks/isAuthPage";

// const buttons = [
//   { label: "Додати користувача", link: "/admin/access/users/create" },
//   { label: "Архів", link: "/admin/access/users/archive" },
// ];

const UsersPage = observer(() => {
  useAuthPage(() => {
    usersStore.getUsers();
  });

  const users = usersStore.users;

  return usersStore.isProcessing ? (
    <Loader />
  ) : (
    <>
      <MetaData>Адміністрування</MetaData>
      <section className="w-[980px] mx-auto h-screen admin relative">
        <TitlePage style={""}>Адміністрування</TitlePage>
        {/* <PageButtons buttons={buttons} /> */}

        <div className="w-[916px] h-[37px] py-2 pl-2 pr-[56px] flex mx-auto items-center gap-x-6 justify-between bg-base-brown text-beige text-14 mt-[15px]">
          {/* <p className="w-[183px]">Користувач</p> */}
          <p className="w-1/3">Логін користувача</p>
          <p className="w-1/3">Тип доступу</p>
          <p className="w-1/3">Статус</p>

          {/* <p className="w-[101px] text-center">Призупинити доступ</p> */}
          {/* <p className="w-[83px]">Редагувати</p> */}
          {/* <p className="w-[73px]">Видалити</p> */}
        </div>
        <div className="w-full h-[calc(100%-400px)] mx-auto overflow-y-auto pt-[18px] px-8">
          {users.map(user => (
            <UserItem user={user} key={user._id} />
          ))}
        </div>
      </section>
    </>
  );
});

export default UsersPage;
