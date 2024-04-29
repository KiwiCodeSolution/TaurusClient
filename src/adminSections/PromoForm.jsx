import { observer } from "mobx-react-lite";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import TextFieldAdmin from "./form/TextFieldAdmin";
import FileFieldAdmin from "./form/FileFieldAdmin";

const FIELDS = [
  {
    id: "1",
    name: "name",
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
    name: item?.name || "",
    description: item?.description || "",
    newPrice: item?.newPrice || "",
    oldPrice: item?.oldPrice || "",
    label: item?.label || "",
    description_img: item?.description_img || "",
    image: item?.image || "",
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

  const onSubmit = data => {
    console.log(data);
    reset();

    window.location.href = "/admin/access/site/menu";
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
              <img src="" alt="" />

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
      </form>
    </>
  );
});

export default PromoForm;
