import { useForm, Controller } from "react-hook-form";
import TextField from "./UI/form/TextField";
import Button from "./UI/Button";
import SelectField from "./UI/form/SelectField";
import DateTimeField from "./UI/form/DateTimeField";
import ChexboxField from "./UI/form/ChexboxField";

const TEXT_FIELDS = [
  {
    id: "1",
    name: "name",
    label: "Ваше ім'я",
    defaultValue: "",
    placeholder: "Ім'я",
    type: "input",
    style: "order-1",
  },
  {
    id: "2",
    name: "email",
    label: "Ваша пошта",
    defaultValue: "",
    placeholder: "Пошта",
    type: "email",
    style: "order-2",
  },
  {
    id: "3",
    name: "phone",
    label: "Номер телефону",
    defaultValue: "",
    placeholder: "+38 0XX XXX XX XX",
    type: "input",
    style: "order-3",
  },
  {
    id: "4",
    name: "message",
    label: "Ваше повідомлення",
    defaultValue: "",
    placeholder: "Введіть текст",
    type: "textarea",
    style: "order-5",
  },
];

const options = [
  { value: "1", label: "1 особа" },
  { value: "2", label: "2 особи" },
  { value: "3", label: "3 особи" },
  { value: "4", label: "4 особи" },
  { value: "5", label: "5 осіб" },
  { value: "6", label: "6 осіб" },
  { value: "7", label: "7 осіб" },
  { value: "8", label: "8 осіб" },
  { value: "9", label: "9 осіб" },
  { value: "10", label: "10 осіб" },
];

const ReserveForm = () => {
  const {
    control,
    handleSubmit,
    // reset,
    resetField,
    // setError,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      quantity: null,
      date: new Date(),
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    // if (!data.selectedOption) {
    //   setError("selectedOption", {
    //     type: "manual",
    //     message: "Будь ласка, оберіть опцію",
    //   });

    //   return;
    // }

    // const trimmedData = trimValues(data);
    // const valueTime = format(data.time, "hh:mm");
    // const valueDate = format(data.date, "dd.MM.yyyy");
    // console.log(valueTime, valueDate, data);

    //очищуємо не тільки всі інпути, але й кастомний селект. прямо вказавши, що саме потрібно очистити

    // reset({ selectedOption: "" });
    // reset();
  };

  const handleReset = (fieldName) => {
    resetField(fieldName);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[542px] h-fit px-[22px] flex flex-col gap-y-4 mb-16 mx-auto ">
      {/* ------------------ inputs --------------- */}

      {TEXT_FIELDS.map(({ id, name, defaultValue, placeholder, type, style, label }) => (
        <TextField
          control={control}
          name={name}
          key={id}
          defaultValue={defaultValue}
          placeholder={placeholder}
          label={label}
          onReset={() => handleReset(name)}
          type={type}
          style={style}
        />
      ))}

      <div className="w-full flex justify-between order-4">
        {/* ------------------ persons --------------- */}
        <Controller
          name="quantity"
          control={control}
          render={({ field }) => (
            <>
              <SelectField
                {...field}
                control={control} // Додайте цей рядок
                options={options}
                name="quantity"
                isSearchable={true}
                placeholder="Кількість осіб"
                style={"order-6"}
                label="Кількість людей"
              />
            </>
          )}
        />

        {/* ------------------ date & time --------------- */}
        <DateTimeField control={control} />
      </div>

      {/* ------------------ text --------------- */}
      <div className="flex flex-col gap-y-[19px] order-8">
        <p className="text-14 text-base-brown">
          <span className="text-base-orange">*</span> поля позначені зірочкою обов’язкові для заповнення
        </p>
        <Controller
          name="agreement"
          control={control}
          render={({ field }) => (
            <ChexboxField
              {...field}
              control={control}
              label={"погоджуюсь на обробку персональних даних"}
              name={"agreement"}
            />
          )}
        />
        {/* <p className="text-14 text-base-brown">погоджуюсь на обробку персональних даних </p> */}
      </div>

      <Button style={"orange"} btnClass="order-10 mt-6 text-center text-18 font-medium" type="submit">
        Забронювати
      </Button>
    </form>
  );
};

export default ReserveForm;
