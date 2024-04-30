import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";

import TextFieldAdmin from "./form/TextFieldAdmin";
import FileFieldAdmin from "./form/FileFieldAdmin";
import Button from "../components/UI/Button";
import axios from "axios";
import { baseServerURL } from "../API/config";

const FIELDS = [
  {
    id: "1",
    name: "title",
    label: "Назва акції",
    style: "",
    isRequired: true,
    type: "input",
  },
  {
    id: "2",
    name: "description",
    label: "Опис акції",
    style: "",
    isRequired: true,
  },

  // {
  //   id: "6",
  //   name: "name",
  //   label: "Опис зображення",
  //   style: "",
  //   isRequired: true,
  //   type: "input",
  // },
];

const FIELDS_PRICE = [
  {
    id: "3",
    name: "newPrice",
    label: "Нова ціна",
    style: "",
    isRequired: true,
    type: "input",
  },
  {
    id: "4",
    name: "oldPrice",
    label: "Стара ціна",
    style: "",
    type: "input",
  },
  {
    id: "5",
    name: "label",
    label: "Ярлик (знижка у кружку)",
    style: "",
    type: "input",
  },
  // {
  //   id: "6",
  //   name: "name",
  //   label: "Опис зображення",
  //   style: "",
  //   isRequired: true,
  //   type: "input",
  // },
];

const PromoForm = observer(({ item, type }) => {
  const defaultValues = {
    title: item?.title || "",
    description: item?.description || "",
    newPrice: item?.newPrice || "",
    oldPrice: item?.oldPrice || "",
    label: item?.label || "",
    description_img: item?.description_img || "",
    image: item?.image || "",
  };

  const {
    control,
    // watch,
    handleSubmit,
    // reset,
    resetField,

    // setError,
  } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  // const fileValue = watch("image");
  // console.log(fileValue);

  const onSubmit = async data => {
    console.log(data);

    try {
      const result = await axios.post(`${baseServerURL}promotions`, data);

      console.log("result", result.data);

      return;
    } catch (error) {
      return { error: error.message };
    }

    // reset();

    // window.location.href = "/admin/access/site/menu";
  };

  const handleReset = fieldName => {
    console.log(fieldName);
    resetField(fieldName);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[502px] h-[567px] mx-auto mt-8 flex flex-col gap-y-4"
      >
        {FIELDS.map(({ id, name, defaultValue, style, label, isRequired, type }) => (
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
        <div className="flex gap-x-4">
          <div className="w-[198px] flex flex-col gap-y-4">
            {FIELDS_PRICE.map(({ id, name, defaultValue, style, label, isRequired, type }) => (
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
          </div>
          <div className="w-[288px] flex flex-col">
            <TextFieldAdmin
              control={control}
              name="description_img"
              label="Опис картинки"
              onReset={() => handleReset("description_img")}
              isRequired={true}
              type={"input"}
            />
            <div className="flex items-start">
              <FileFieldAdmin
                control={control}
                name="image"
                label="Зображення"
                onReset={() => handleReset("image")}
                isRequired={true}
              />
            </div>
          </div>
        </div>
        <Button
          style={"orange"}
          btnClass="order-10 mt-6 text-center text-18 font-medium"
          type="submit"
        >
          Відправити
        </Button>
      </form>
    </>
  );
});

export default PromoForm;
