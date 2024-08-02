import PropTypes from "prop-types";
import { useState } from "react";
// import { Archive, Hide, Minus, Plus, Show, Trash } from "../icons/iconComponent";
import { observer } from "mobx-react";
// import authStore from "../store/auth";

const UserItem = observer(({ user }) => {
  const { username, role, active } = user;
  const [isOpenUser, setIsOpenUser] = useState(false);
  // const [isShowPassword, setIsShowPassword] = useState(false);

  // const ArrayPasswordItems = () => {
  //   const length = password.length;
  //   const array = Array.from({ length }, (_, index) => index); // Створюємо масив з індексами

  //   return (
  //     <div className="flex gap-x-[2px]">
  //       {array.map(item => (
  //         <div key={item} className="w-[10px] h-[10px] rounded-full bg-beige opacity-50" />
  //       ))}
  //     </div>
  //   );
  // };
  const status = active ? "користувач активний" : "доступ призупинено";

  return (
    <article
      className={`w-full min-h-[71px] px-6 border-b border-base-brown border-dashed text-sm text-beige ${
        isOpenUser ? "bg-dark-bg" : ""
      }`}
    >
      <div
        className={`w-full h-[71px] flex items-center gap-x-6 overflow-hidden ${
          isOpenUser ? "border-b border-black" : ""
        }`}
      >
        {/* <p className="w-[183px]">{name}</p> */}
        <p className="w-1/3">{username}</p>
        <p className="w-1/3">{role}</p>
        <p className="w-1/3">{status}</p>

        {/* <p className="w-[101px]">пр</p> */}
        {/* <p className="w-[83px]">ред</p> */}
        {/* <p className="w-[73px]">дел</p> */}
        {/* <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenUser(!isOpenUser)}
        >
          {isOpenUser ? <Minus /> : <Plus />}
        </button> */}
      </div>
      {/* {isOpenUser && (
        <div>
          <div className="grid grid-cols-2">
            <p className="">
              <span className="text-base font-semibold text-base-yellow">Логін: </span>

              {login}
            </p>
            <p>
              <span className="text-base font-semibold text-base-yellow">Роль: </span>
              {role}
            </p>

            <div className="flex gap-x-2 items-center ">
              <p className="text-base font-semibold text-base-yellow">Пароль: </p>
              <div className="min-w-[270px] h-8 bg-grey relative flex items-center px-2">
                {isShowPassword ? <span className=""> {password}</span> : <ArrayPasswordItems />}
                <button
                  className="absolute top-1/2 right-2 -translate-y-1/2"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <Hide className={"fill-beige"} />
                  ) : (
                    <Show className={"fill-beige"} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="w-fit flex justify-between items-center gap-x-4 my-4 ml-auto">
            <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
              <Archive className={"fill-white w-4 h-4"} />
            </button>
            {authStore.user.role === "admin" && (
              <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
                <Trash className={"fill-white w-4 h-4"} />
              </button>
            )}
          </div>
        </div>
      )} */}
    </article>
  );
});

UserItem.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    access_type: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserItem;
