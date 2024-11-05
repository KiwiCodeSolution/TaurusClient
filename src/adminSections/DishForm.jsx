/* eslint-disable no-unused-vars */
import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import SelectFieldAdmin from "./form/SelectFieldAdmin";
import TextFieldAdmin from "./form/TextFieldAdmin";
import Button from "../components/UI/Button";
import { Archive, Show, Trash } from "../icons/iconComponent";
import { useEffect, useState } from "react";
import ConfirmModalAdmin from "./modal/ConfirmModalAdmin";
import dishesStore from "../store/dishes";
import { updateDishAvailable } from "../API/dishes";
import CheckboxField from "../components/UI/form/CheckboxField";
import authStore from "../store/auth";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const topOptions = [
  { value: "dishes", label: "основне меню" },
  { value: "desserts", label: "десерти" },
  { value: "drinks", label: "напої" },
];

const options = {
  dishes: [
    { value: "bbq_menu", label: "bbq-меню" },
    { value: "bruschetta", label: "брускети" },
    { value: "burgers", label: "бургери" },
    { value: "side_dishes", label: "гарніри" },
    { value: "hot_appetizers", label: "гарячі закуски" },
    { value: "main_dishes", label: "основні страви" },
    { value: "paste", label: "паста" },
    { value: "pizza", label: "піца" },
    { value: "salads", label: "салати" },
    { value: "sets", label: "сети" },
    { value: "sauces", label: "соуси" },
    { value: "soups", label: "супи" },
    { value: "cold_dishes", label: "холодні страви" },
  ],

  desserts: [
    { value: "waffles", label: "вафлі" },
    { value: "ice", label: "морозиво" },
    { value: "pie", label: "пиріг" },
    { value: "cakes", label: "тістечка" },
    { value: "cheesecake", label: "чизкейк" },
  ],

  drinks: [
    { value: "bitters", label: "біттери" },
    { value: "whiskey", label: "віскі" },
    { value: "soft_drinks", label: "вермути" },
    { value: "wine", label: "вино" },
    { value: "hot_beverages", label: "гарячі напої" },
    { value: "mulled_wine", label: "глінтвейн" },
    { value: "vodka", label: "горілка" },
    { value: "gin", label: "джин" },
    { value: "coffee_cocoa", label: "кава та какао" },
    { value: "cocktails", label: "коктейлі" },
    { value: "cognac_brandy", label: "коньяк та бренді" },
    { value: "liqueurs", label: "лікери" },
    { value: "lemonade", label: "лимонад" },
    { value: "milkshakes", label: "молочні коктейлі" },
    { value: "drinks", label: "напої" },
    { value: "tinctures", label: "настоянки" },
    { value: "beer", label: "пиво" },
    { value: "port_wine", label: "портвейн" },
    { value: "rum", label: "ром" },
    { value: "tequila_mezcal", label: "текіла та мескаль" },
    { value: "fresh", label: "фреші" },
    { value: "tea", label: "чай" },
    { value: "shot", label: "шот" },
  ],
};

const subOptions = [
  { value: "american_whiskey", label: "американський віскі " },
  { value: "bitters", label: "біттери" },
  { value: "brandy", label: "бренді" },
  { value: "soft_drinks", label: "вермути" },
  { value: "whiskey_Scottish_Islands", label: "віскі шотландських островів" },
  { value: "hot_beverages", label: "гарячі напої" },
  { value: "mulled_wine", label: "глінтвейн" },
  { value: "vodka", label: "горілка" },
  { value: "gin", label: "джин" },
  { value: "snacks_beer", label: "закуски до пива" },
  { value: "sparkling_wine", label: "ігристе вино" },
  { value: "irish_whiskey", label: "ірландський віскі" },
  { value: "coffee_cocoa", label: "кава та какао" },
  { value: "craft_beer", label: "кегове пиво" },
  { value: "cocktails", label: "коктейлі" },
  { value: "cognac", label: "коньяк" },
  { value: "lemonade", label: "лимонад" },
  { value: "liqueurs", label: "лікери" },
  { value: "mezcal", label: "мескаль" },
  { value: "milkshakes", label: "молочні коктейлі" },
  { value: "drinks", label: "напої" },
  { value: "tinctures", label: "настоянки" },
  { value: "port_wine", label: "портвейн" },
  { value: "rum", label: "ром" },
  { value: "tequila", label: "текіла" },
  { value: "quiet_white_wine", label: "тихе біле вино" },
  { value: "quiet_pink_wine", label: "тихе рожеве вино" },
  { value: "quiet_red_wine", label: "тихе червоне вино" },
  { value: "fresh", label: "фреші" },
  { value: "tea", label: "чай" },
  { value: "branded_tea", label: "чай фірмовий" },
  { value: "shot", label: "шот" },
  { value: "scotch_whiskey", label: "шотландський віскі" },
];

const fieldsDescription = [
  {
    id: "1",
    name: "name",
    label: "Назва",
    style: "text-18 text-beige",
    isRequired: true,
    type: "input",
  },
  {
    id: "2",
    name: "description",
    label: "Додаткова інформація",
    style: "text-14 text-beige",
    isRequired: false,
  },
  {
    id: "3",
    name: "englishName",
    label: "Опис англійською",
    style: "text-xs font-medium text-base-brown",
    isRequired: false,
  },
];

const fieldPrice = [
  {
    id: "4",
    name: "weight",
    label: "Вага",
    style: "w-[30%] text-14 text-beige",
    isRequired: false,
    type: "input",
  },
  {
    id: "5",
    name: "price",
    label: "Ціна",
    style: "w-[30%] text-14 text-base-yellow font-semibold",
    isRequired: true,
    type: "input",
  },
  {
    id: "6",
    name: "discount_price",
    label: "Знижка",
    style: "w-[30%] text-14 text-beige",
    isRequired: false,
    type: "input",
  },
];

const checkFields = [
  {
    id: "8",
    name: "new",
    label: "Додати плашку “NEW”",
    // style: "w-[30%] text-14 text-base-yellow font-semibold",
    isRequired: true,
    // type: "input",
  },
  {
    id: "9",
    name: "delivery",
    label: "Додати в меню доставки",
    // style: "w-[30%] text-14 text-beige",
    isRequired: false,
    // type: "input",
  },
];

const promoFields = [
  {
    id: "10",
    name: "promo",
    label: "Плашка “Акція”",
    // style: "w-[30%] text-14 text-base-yellow font-semibold",
    isRequired: true,
    // type: "input",
  },
  {
    id: "11",
    name: "salary",
    label: "Додати плашку знижки",
    // style: "w-[30%] text-14 text-beige",
    isRequired: false,
    // type: "input",
  },
];

const DishForm = observer(({ item, type }) => {
  const navigate = useNavigate();
  dishesStore.setNavigate(navigate);

  const itemTopCategory = topOptions.find(option => option.label === item?.topCategory);
  const itemTopCategoryValue = itemTopCategory?.value;
  const itemCategory = options[itemTopCategoryValue]?.find(
    option => option.label === item?.category
  );
  const itemSubCategory = subOptions.find(option => option.label === item?.subCategory);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  const defaultValues = {
    top: itemTopCategory || topOptions[0],
    category: itemCategory || "",
    sub: itemSubCategory || subOptions[0],
    name: item?.name || "",
    description: item?.description || "",
    englishName: item?.englishName || "",
    price: item?.price || "",
    // discount_price: item?.discount || "",
    weight: item?.weight || "",
    salary: item?.discount || false,
    promo: item?.action || false,
    new: item?.new || false,
    delivery: item?.displayInDeliveryMenu || false,
  };

  const [isCheckedPromo, setIsCheckedPromo] = useState({
    promo: item?.action || false,
    salary: item?.discount || false,
  });

  const [isChecked, setIsChecked] = useState({
    new: item?.new || false,
    delivery: item?.displayInDeliveryMenu || false,
  });

  const { control, watch, handleSubmit, resetField } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const topValue = watch("top", "");
  const currentOptions = topValue?.value || itemTopCategory?.value || topOptions[0].value;

  const handleAction = (actionType, data) => {
    switch (actionType) {
      case "save":
        console.log("Save action", data.top.label);
        dishesStore.updateDishesAction({ ...item, ...data, category: data.top.label });
        break;
      case "archive":
        console.log("Archive action", item._id);
        dishesStore.updateDishesAction({ ...item, archive: !item.archive });
        break;
      case "hide":
        console.log("Hide action", item._id);
        updateDishAvailable({ ...item, available: !data.available }, authStore.token);
        break;
      case "delete":
        console.log("Delete action", item._id);
        setIsOpenModalConfirm(true);
        dishesStore.deleteDishesAction(item);
        break;
      default:
        break;
    }
  };

  const createDish = data => {
    const requestData = {
      ...data,
      topCategory: data.top.label,
      subCategory: data.sub.label,
      category: data.category.label,
      displayInDeliveryMenu: data.delivery,
      action: data.promo,
    };
    if (data.top.label !== "напої") {
      delete requestData.subCategory;
    }
    delete requestData.top;
    delete requestData.sub;
    delete requestData.delivery;

    // console.log(requestData);
    dishesStore.createDishesAction(requestData);
  };

  const updateDish = data => {
    // console.log(data);
    const requestData = {
      ...data,
      category: data.category.label,
      action: data.promo,
      discount: data.salary,
      displayInDeliveryMenu: data.delivery,
    };
    delete requestData.top;
    delete requestData.sub;
    delete requestData.delivery;
    if ((item.topCategory || data.topCategory) !== " напої") {
      delete requestData.subCategory;
      delete item.subCategory;
    }
    console.log("requestData", { ...item, ...requestData });
    dishesStore.updateDishesAction({ ...item, ...requestData });
  };

  const onSubmit = (data, event) => {
    const actionType = event.nativeEvent.submitter.name;

    if (actionType === "create") {
      createDish(data);
    }

    if (actionType === "save") {
      updateDish(data);
    }
    if (actionType === "archive") {
      dishesStore.updateDishesAction({ ...item, archive: !item.archive });
    }
    if (actionType === "hide") {
      updateDishAvailable({ ...item, available: !data.available }, authStore.token);
    }
    if (actionType === "delete") {
      setIsOpenModalConfirm(true);
      dishesStore.deleteDishesAction(item);
    }
  };

  const handleReset = fieldName => {
    resetField(fieldName);
  };

  useEffect(() => {
    resetField("category");
  }, [topValue, resetField]);

  return dishesStore.isProcessing ? (
    <Loader />
  ) : (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[502px] h-[567px] mx-auto mt-[72px] flex flex-col gap-y-4 relative"
      >
        {/* ------------------ top category --------------- */}
        <Controller
          name="top"
          control={control}
          render={({ field }) => (
            <>
              <SelectFieldAdmin
                {...field}
                control={control}
                options={topOptions}
                placeholder="Оберіть головний розділ меню"
                name="top"
                isSearchable={true}
                label="Головний розділ меню"
                style={"w-full uppercase"}
                isRequired
              />
            </>
          )}
        />

        <div className="flex items-center justify-between">
          {/* ------------------ category --------------- */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <>
                <SelectFieldAdmin
                  {...field}
                  control={control}
                  options={options[currentOptions]}
                  // value={options[currentOptions].find(option => option.value === field.value)}
                  placeholder="оберіть категорію"
                  name="category"
                  isSearchable={true}
                  label="Категорія меню"
                  style={
                    (itemSubCategory || topValue.label) === "напої" ? "w-[241px]" : "w-[502px]"
                  }
                  isRequired
                />
              </>
            )}
          />

          {/* ------------------ sub category --------------- */}
          {(itemSubCategory || topValue.label) === "напої" && (
            <Controller
              name="sub"
              control={control}
              render={({ field }) => (
                <>
                  <SelectFieldAdmin
                    {...field}
                    control={control}
                    options={subOptions}
                    name="sub"
                    isSearchable={true}
                    label="Підкатегорія меню"
                    style={"w-[241px]"}
                  />
                </>
              )}
            />
          )}
        </div>

        {fieldsDescription.map(({ id, name, defaultValue, style, label, isRequired, type }) => (
          <TextFieldAdmin
            control={control}
            name={name}
            key={id}
            defaultValue={defaultValue}
            label={label}
            onReset={() => handleReset(name)}
            style={style}
            isRequired={isRequired}
            type={type}
          />
        ))}

        <div className="flex items-center justify-between">
          {fieldPrice.map(({ id, name, defaultValue, style, label, isRequired, type }) => (
            <TextFieldAdmin
              control={control}
              name={name}
              key={id}
              defaultValue={defaultValue}
              label={label}
              onReset={() => handleReset(name)}
              isRequired={isRequired}
              style={style}
              type={type}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="w-[242px] flex flex-col gap-y-4">
            {promoFields.map(({ name, id, label }) => (
              <Controller
                name={name}
                control={control}
                key={id}
                render={({ field }) => (
                  <CheckboxField
                    {...field}
                    control={control}
                    label={label}
                    name={name}
                    onChecked={() =>
                      setIsCheckedPromo(prevState => ({
                        ...prevState,
                        [name]: !prevState[name],
                      }))
                    }
                    isCheck={isCheckedPromo[name]}
                    isRequired={false}
                    section={"admin"}
                  />
                )}
              />
            ))}
          </div>

          <div className="w-[242px] flex flex-col gap-y-4">
            {checkFields.map(({ name, id, label }) => (
              <Controller
                name={name}
                control={control}
                key={id}
                render={({ field }) => (
                  <CheckboxField
                    {...field}
                    control={control}
                    label={label}
                    name={name}
                    onChecked={() =>
                      setIsChecked(prevState => ({
                        ...prevState,
                        [name]: !prevState[name],
                      }))
                    }
                    isCheck={isChecked[name]}
                    isRequired={false}
                    section={"admin"}
                  />
                )}
              />
            ))}
          </div>
        </div>

        <p className="text-14 text-base-brown">
          <span className="text-base-orange">*</span> поля позначені зірочкою обов’язкові для
          заповнення
        </p>

        {/* кнопки */}

        {type === "create" ? (
          <div className="w-fit flex items-center gap-x-5 mx-auto">
            <Button type="submit" style={"orange"} name="create">
              Створити
            </Button>
          </div>
        ) : (
          <div className="w-fit flex flex-col items-center gap-y-4 mx-auto absolute top-0 -right-[200px]">
            <Button type="submit" style={"orange"} name="save">
              Зберегти
            </Button>
            <Button
              type="submit"
              style={"beige"}
              btnClass="flex items-center justify-center gap-x-[6px] btn-archive"
              name="archive"
            >
              <Archive className={"fill-beige"} />
              {item.archive ? "Деархівувати" : "Архівувати "}
            </Button>
            <Button
              type="submit"
              style={"beige"}
              btnClass="flex items-center justify-center gap-x-[6px] btn-show"
              name="hide"
            >
              <Show className={"fill-beige"} />
              Приховати
            </Button>
            {authStore.user.role === "admin" && (
              <Button
                style={"beige"}
                btnClass="flex items-center justify-center gap-x-[6px] trash"
                clickFn={() => setIsOpenModalConfirm(true)}
                name="delete"
              >
                <Trash className={"fill-beige w-4 h-4 trash-icon"} /> Видалити
              </Button>
            )}
          </div>
        )}
      </form>
      {isOpenModalConfirm && (
        <ConfirmModalAdmin
          clickFn={() => setIsOpenModalConfirm(false)}
          confirmFn={() => dishesStore.deleteDishesAction(item)}
        >
          <p className="w-[218px] text-xl uppercase text-beige text-center mx-auto mb-8">
            Підтвердження видалення
          </p>
          <p className="w-full text-18 text-beige text-center mb-12">
            Ви впевнені, що хочете видалити позицію?
          </p>
        </ConfirmModalAdmin>
      )}
    </>
  );
});

export default DishForm;
