import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import SelectFieldAdmin from "./form/SelectFieldAdmin";
import TextFieldAdmin from "./form/TextFieldAdmin";

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
    label: "Назва великими літерами",

    style: "",
    isRequired: true,
  },
  {
    id: "2",
    name: "description",
    label: "Додаткова інформація",
    style: "",
    isRequired: true,
  },
  {
    id: "3",
    name: "englishName",
    label: "Назва англійською",
    style: "",
    isRequired: true,
  },
];

const fieldsDPrice = [
  {
    id: "4",
    name: "price",
    label: "Ціна",
    style: "w-[241px]",
    isRequired: true,
  },
  {
    id: "5",
    name: "discount",
    label: "Знижка",
    style: "w-[241px]",
    isRequired: false,
  },
];

const EditForm = observer(({ item }) => {
  const itemTopCategory = topOptions.find(option => option.label === item?.topCategory);
  const itemSubCategory = subOptions.find(option => option.label === item?.subCategory);
  const itemCategory = options.itemTopCategory?.find(option => option.label === item?.category);

  const defaultValues = {
    top: itemTopCategory || topOptions[0],
    category: itemCategory || options[0],
    sub: itemSubCategory || subOptions[0],
    name: item?.name || "",
    description: item?.description || "",
    englishName: item?.englishName || "",
    price: item?.price || "",
    discount_price: item?.discount_price || "",
    // weight: item?.weight || "",
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
  const currentOptions = topValue?.value || itemTopCategory.value;

  const onSubmit = data => {
    console.log(data);

    reset();
  };

  const handleReset = fieldName => {
    resetField(fieldName);
  };

  return (
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
              style={"w-full"}
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
    </form>
  );
});

export default EditForm;
