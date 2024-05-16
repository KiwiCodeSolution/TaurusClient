import { useState } from "react";
import { Archive, Hide, Minus, Plus, Show, Trash } from "../icons/iconComponent";

const UserItem = () => {
  const [isOpenOrder, setIsOpenOrder] = useState(false);

  return (
    <article className="w-full px-2 border-b border-base-brown border-dashed text-sm text-beige">
      <div className="w-full flex items-center gap-x-6  overflow-hidden">
        <p className="w-[183px]">Катерина Олександрівна Коваленко-Бачинська</p>
        <p className="w-[160px]">kate_kov_bach</p>
        <p className="w-[132px]">Обмежений</p>
        <p className="w-[101px]">пр</p>
        <p className="w-[83px]">ред</p>
        <p className="w-[73px]">дел</p>
        <button
          className="w-6 h-6 bg-dark-btn-bg cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpenOrder(!isOpenOrder)}
        >
          {isOpenOrder ? <Minus /> : <Plus />}
        </button>
      </div>
      {isOpenOrder && (
        <div>
          <div className="grid grid-cols-2">
            <p className="">
              <span className="text-base font-semibold text-base-yellow">Логін: </span>
              <a href="mailto:roman_bondarenko@gmail.com" className="cursor-pointer">
                логін
              </a>
            </p>
            <p>
              <span className="text-base font-semibold text-base-yellow">Роль: </span>
              Адміністратор
            </p>

            <div className="flex gap-x-2 items-center ">
              <p className="text-base font-semibold text-base-yellow">Пароль: </p>
              <div className="min-w-[270px] h-8 bg-grey relative">
                <button className="absolute top-1/2 right-2 -translate-y-1/2">
                  <Show className={"fill-beige"} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-fit flex justify-between items-center gap-x-4 my-4 ml-auto">
            <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
              <Archive className={"fill-white w-4 h-4"} />
            </button>
            <button className="w-[60px] h-[30px] bg-dark-btn-bg hover:bg-transparent hover:border hover:border-1 hover:border-beige cursor-pointer flex items-center justify-center">
              <Trash className={"fill-white w-4 h-4"} />
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default UserItem;
