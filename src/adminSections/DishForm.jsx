import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import SelectFieldAdmin from "./form/SelectFieldAdmin";
import TextFieldAdmin from "./form/TextFieldAdmin";
import Button from "../components/UI/Button";
import { Trash } from "../icons/iconComponent";
import { useState } from "react";
import ConfirmModalAdmin from "./modal/ConfirmModalAdmin";
import dishesStore from "../store/dishes";
import { createDish, updateDish } from "../API/dishes";

const topOptions = [
  { value: "dishes", label: "основне меню" },
  { value: "desserts", label: "десерти" },
  { value: "drinks", label: "напої" },
];

const options = {
  dishes: [
    { value: "cold_dishes", label: "холодні страви" },
    { value: "bruschetta", label: "брускети" },
    { value: "salads", label: "салати" },
    { value: "hot_appetizers", label: "гарячі закуски" },
    { value: "burgers", label: "бургери" },
    { value: "soups", label: "супи" },
    { value: "paste", label: "паста" },
    { value: "main_dishes", label: "основні страви" },
    { value: "bbq_menu", label: "bbq-меню" },
    { value: "side_dishes", label: "гарніри" },
    { value: "sauces", label: "соуси" },
  ],

  desserts: [
    { value: "cakes", label: "тістечка" },
    { value: "ice", label: "морозиво" },
  ],

  drinks: [
    { value: "beer", label: "пиво" },
    { value: "wine", label: "вино" },
    { value: "strong_drinks", label: "міцні напої" },
    { value: "cocktails", label: "коктейлі" },
    { value: "soft_drinks", label: "безалкогольні напої" },
    { value: "hot_drinks", label: "гарячі напої" },
  ],
};

const subOptions = [
  { value: "snacks_beer", label: "закуски до пива" },
  { value: "craft_beer", label: "крафтове пиво" },
  { value: "rose_wine", label: "рожеве вино" },
];

const fieldsDescription = [
  {
    id: "1",
    name: "name",
    label: "Назва",
    style: "text-18 text-beige",
    isRequired: true,
  },
  {
    id: "2",
    name: "description",
    label: "Додаткова інформація",
    style: "text-14 text-beige",
    isRequired: true,
  },
  {
    id: "3",
    name: "englishName",
    label: "Опис англійською",
    style: "text-xs font-medium text-base-brown",
    isRequired: true,
  },
];

const fieldsDPrice = [
  {
    id: "4",
    name: "price",
    label: "Ціна",
    style: "w-[30%] text-14 text-base-yellow font-semibold",
    isRequired: true,
  },
  {
    id: "5",
    name: "discount",
    label: "Знижка",
    style: "w-[30%] text-14 text-beige",
    isRequired: false,
  },
  {
    id: "6",
    name: "weight",
    label: "Вага",
    style: "w-[30%] text-14 text-beige",
    isRequired: false,
  },
];

const DishForm = observer(({ item, type }) => {
  const itemTopCategory = topOptions.find(option => option.label === item?.topCategory);
  const itemTopCategoryValue = itemTopCategory?.value;
  const itemCategory = options[itemTopCategoryValue]?.find(
    option => option.label === item?.category
  );
  const itemSubCategory = subOptions.find(option => option.label === item?.subCategory);
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useState(false);

  const defaultValues = {
    top: itemTopCategory || topOptions[0],
    category: itemCategory || options[0],
    sub: itemSubCategory || subOptions[0],
    name: item?.name || "",
    description: item?.description || "",
    englishName: item?.englishName || "",
    price: item?.price || "",
    discount_price: item?.discount_price || "",
    weight: item?.weight || "",
  };

  const {
    control,
    watch,
    handleSubmit,
    reset,
    resetField,
    // setError,
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const topValue = watch("top", "");
  const currentOptions = topValue?.value || itemTopCategory?.value || topOptions[0].value;

  const onSubmit = data => {
    // if (type === "create") {
    //   createDish(data);
    // }

    // updateDish(data);

    console.log(data);
    reset();

    window.location.href = "/admin/access/site/menu";
  };

  const handleReset = fieldName => {
    resetField(fieldName);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[502px] h-[567px] mx-auto mt-8 flex flex-col gap-y-4"
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
                  name="category"
                  isSearchable={true}
                  label="Категорія меню"
                  style={itemSubCategory || topValue.label === "напої" ? "w-[241px]" : "w-[502px]"}
                  isRequired
                />
              </>
            )}
          />

          {/* ------------------ sub category --------------- */}
          {(itemSubCategory || topValue.label === "напої") && (
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

        {fieldsDescription.map(({ id, name, defaultValue, style, label, isRequired }) => (
          <TextFieldAdmin
            control={control}
            name={name}
            key={id}
            defaultValue={defaultValue}
            label={label}
            onReset={() => handleReset(name)}
            style={style}
            isRequired={isRequired}
          />
        ))}

        <div className="flex items-center justify-between">
          {fieldsDPrice.map(({ id, name, defaultValue, style, label, isRequired }) => (
            <TextFieldAdmin
              control={control}
              name={name}
              key={id}
              defaultValue={defaultValue}
              label={label}
              onReset={() => handleReset(name)}
              isRequired={isRequired}
              style={style}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">1 2</div>
          <div className="flex flex-col">1 2</div>
        </div>

        <p className="text-14 text-base-brown">
          <span className="text-base-orange">*</span> поля позначені зірочкою обов’язкові для
          заповнення
        </p>

        {type === "create" ? (
          <div className="w-fit flex items-center gap-x-5 mx-auto">
            <Button type="submit" style={"orange"}>
              Створити
            </Button>
          </div>
        ) : (
          <div className="w-fit flex items-center gap-x-5 mx-auto">
            <Button type="submit" style={"orange"}>
              Зберігти
            </Button>
            <Button
              style={"transparent"}
              btnClass="flex items-center justify-center gap-x-[6px] trash"
              clickFn={() => setIsOpenModalConfirm(true)}
            >
              <Trash className={"fill-white w-4 h-4"} /> Видалити
            </Button>
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
