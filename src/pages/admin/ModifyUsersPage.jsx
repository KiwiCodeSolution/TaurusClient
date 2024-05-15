import PropTypes from "prop-types";
import { observer } from "mobx-react-lite";
import TitlePage from "../../adminSections/TitlePage";
import MetaData from "../../components/MetaData";

import ButtonBack from "../../adminSections/ButtonBack";

import { Archive, ArrowBack } from "../../icons/iconComponent";
import { useParams } from "react-router-dom";
import UsersForm from "../../adminSections/UsersForm";

const ModifyUsersPage = observer(({ type }) => {
  const { _id } = useParams();

  // const user = userStore.user;

  // if (!_id && type === "edit") return <h3 className="text-beige ">Вибачте, сталася помилка</h3>;
  // if (!user) return <h2>Ми не отримали списку користувачів. Спробуйте ще раз</h2>;

  // const currentUser = user.find(user => user._id === _id);
  // if (!currentUser && type === "edit") return <h2>У нас немає користувача з id:{_id}</h2>;

  return (
    <>
      <MetaData>{type === "edit" ? "Редагування користувача" : "Додавання користувача"}</MetaData>
      <section className="w-[980px] mx-auto flex flex-col admin">
        <TitlePage>
          {type === "edit" ? "Редагування користувача" : "Додавання користувача"}
        </TitlePage>

        <div className="w-[980px] mx-auto relative ">
          <ButtonBack />
          {type === "edit" ? (
            <UsersForm item={currentUser} type={"edit"} />
          ) : (
            <UsersForm type={"create"} />
          )}
        </div>
      </section>
    </>
  );
});

ModifyUsersPage.propTypes = {
  type: PropTypes.string,
};

export default ModifyUsersPage;
