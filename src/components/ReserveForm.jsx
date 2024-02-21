import { useForm, Controller } from "react-hook-form";
import TextField from "./UI/form/TextField";

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
    type: "input",
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
    style: "order-7",
  },
];

const ReserveForm = () => {
  const {
    control,
    handleSubmit,
    // reset,
    resetField,
    // setError,
    // formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {},
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
    <form onSubmit={handleSubmit(onSubmit)} className="w-[542px] h-fit px-[22px] flex flex-col gap-y-4 mx-auto">
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

      {/* ------------------ selects --------------- */}
      {/* {SELECT_FIELD.map(({ id, name, placeholder, options, style }) => (
          <Controller
            key={id}
            name={name}
            control={control}
            render={({ field }) => (
              <>
                <SelectField {...field} options={options} isSearchable={true} placeholder={placeholder} style={style} />
                {errors.selectedOption && <p>{errors.selectedOption.message}</p>}
              </>
            )}
          />
        ))} */}

      {/* ------------------ date & time --------------- */}
      {/* {DATE_TIME_FIELDS.map(({ id, name, placeholder, style, type, label }) => (
          <DateTimeField
            name={name}
            control={control}
            placeholder={placeholder}
            style={style}
            key={id + name}
            type={type}
            label={label}
          />
        ))} */}

      <button className="order-10">
        <p className="w-full text-center">надіслати</p>
      </button>
    </form>
  );
};

export default ReserveForm;
