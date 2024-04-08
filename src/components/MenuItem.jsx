import { observer } from "mobx-react-lite";

const MenuItem = observer(({ item }, section) => {
  console.log(section);

  if (!item) {
    return <h3 className="text-lite-yellow ">Вибачте, сталася помилка</h3>;
  }

  const { name, price, unit, description } = item;

  return (
    <article
      className={`${
        section === "admin" ? "w-[914px]" : "w-[831px]"
      } flex gap-x-14 mx-auto items-center justify-between`}
    >
      <ul
        className={`flex flex-col text-lite-yellow  overflow-hidden ${
          section === "order" ? "w-[546px]" : "w-full"
        }`}
      >
        <li className="text-lg uppercase">{name}</li>
        <li className="text-sm flex justify-between">
          <p className="w-fit relative">
            {description} ({unit})
            <span className="w-[90%] absolute top-0 left-[100%] z-0">
              ....................................................................................................................................................................................................................................................................................................................................................................................................
            </span>
          </p>
          <p className="w-fit h-full bg-base-back z-10">{price}грн</p>
        </li>
        <li className="text-xs text-base-brown">Pasta with vegan meatballs and tomato sauce</li>
        {section === "admin" && <li className="w-[426px]">buttons</li>}
      </ul>
    </article>
  );
});

export default MenuItem;
