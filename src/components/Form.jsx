import PropTypes from "prop-types";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useForm, Controller } from "react-hook-form";
import TextField from "./UI/form/TextField";
import Button from "./UI/Button";
import SelectField from "./UI/form/SelectField";
import DateTimeField from "./UI/form/DateTimeField";
import CheckboxField from "./UI/form/CheckboxField";
import { useState } from "react";
import ConfirmPopup from "./ConfirmPopup";
import orderStore from "../store/order";
import { baseServerURL } from "../API/config";

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

const Form = observer(({ namePage, clickFn }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
    quantity: null,
    date: new Date(),
    consent: false, // Додайте це значення за замовчуванням
  };

  const {
    control,
    handleSubmit,
    reset,
    resetField,
    // setError,
  } = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  const onSubmit = async data => {
    console.log("onSubmit", data);
    const formattedData = {
      ...data,
      // Відправити лише значення поля часу
      time: data.time?.value,
    };

    if (namePage === "contacts") {
      try {
        delete data.quantity;
        delete data.date;

        const result = await axios.post(`${baseServerURL}feedback`, data);

        console.log("result", result.data);
        setIsModalOpen(true);
        setConsentChecked(false);
        reset(defaultValues);

        return;
      } catch (error) {
        return { error: error.message };
      }
    }

    if (namePage === "order") {
      const formatData = toJS(orderStore.order.items);
      delete formattedData.quantity;

      const requestData = {
        ...formattedData,
        products: formatData,
        delivery_type: orderStore.order.delivery_type,
      };

      try {
        console.log("requestData", requestData);
        const result = await axios.post(`${baseServerURL}order`, requestData);
        console.log("result", result);

        clickFn();
        orderStore.clearOrderedProductList();
        setConsentChecked(false);
        reset();
        return result;
      } catch (error) {
        return { error: error.message };
      }
    }

    reset();
  };

  const handleReset = fieldName => {
    resetField(fieldName);
  };

  // стилі для форми в залежності від її розташування
  const formStyle =
    namePage === "reserve"
      ? "w-[597px] h-fit px-[22px] flex flex-col gap-y-4 mb-16 mx-auto"
      : namePage === "contacts"
      ? "w-[546px] px-6 flex flex-col gap-y-4 mt-8 mx-auto"
      : namePage === "order"
      ? "w-[578px] flex flex-col gap-y-4 mx-auto"
      : "";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyle}>
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

        {namePage !== "contacts" && (
          <div className="w-full flex justify-between order-4">
            {/* ------------------ persons --------------- */}
            {namePage === "reserve" && (
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <>
                    <SelectField
                      {...field}
                      control={control}
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
            )}

            {/* ------------------ date & time --------------- */}
            <DateTimeField control={control} namePage={namePage} />
          </div>
        )}

        {/* ------------------ text --------------- */}
        <div className="flex flex-col gap-y-[19px] order-8">
          <p className="text-14 text-base-brown">
            <span className="text-base-orange">*</span> поля позначені зірочкою обов’язкові для
            заповнення
          </p>
          <Controller
            name="consent"
            control={control}
            render={({ field }) => (
              <CheckboxField
                {...field}
                control={control}
                label={"погоджуюсь на обробку персональних даних"}
                name={"consent"}
                checked={consentChecked} // Додайте цей рядок
                onChange={e => setConsentChecked(e.target.checked)}
              />
            )}
          />
        </div>

        <Button
          style={"orange"}
          btnClass="order-10 mt-6 text-center text-18 font-medium"
          type="submit"
        >
          {namePage === "reserve"
            ? "Забронювати"
            : namePage === "contacts"
            ? "Відправити"
            : namePage === "order"
            ? "Підтвердити замолення"
            : "Відправити"}
        </Button>
      </form>

      {isModalOpen && <ConfirmPopup clickFn={() => setIsModalOpen(false)} type={"contact"} />}
    </>
  );
});

Form.propTypes = {
  namePage: PropTypes.string.isRequired,
  clickFn: PropTypes.func,
};

export default Form;
