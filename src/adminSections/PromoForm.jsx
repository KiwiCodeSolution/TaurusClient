import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextFieldAdmin from "./form/TextFieldAdmin";
import Button from "../components/UI/Button";
import axios from "axios";
import { baseServerURL } from "../API/config";
import { Archive, Show, Trash } from "../icons/iconComponent";
import { useState } from "react";
import { toastOptions } from "../API/dishes";
import { createPromotion, updatePromotion } from "../API/promotions";

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
];

const PromoForm = observer(({ item, type }) => {
  console.log(item);
  const defaultValues = {
    _id: item?._id || "",
    title: item?.title || "",
    description: item?.description || "",
    newPrice: item?.newPrice || "",
    oldPrice: item?.oldPrice || "",
    label: item?.label || "",
    description_img: item?.description_img || "",
    image: item?.image || null,
  };

  const { control, handleSubmit, reset, resetField } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const imagePreview = item?.image && `http://localhost:5000/${item?.image}`;

  const [previewImage, setPreviewImage] = useState(imagePreview || null);
  const [isImageChange, setIsImageChange] = useState(false); // відслідковуємо, чи змінювалось зображення

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];

    const maxSizeInBytes = 8388608;
    if (selectedFile.size > maxSizeInBytes) {
      toast.error("Зображення занадто велике. Оберіть файл меншого розміру.", toastOptions);
      return;
    }

    if (!selectedFile.type.includes("image")) {
      toast.error("Будь ласка, виберіть зображення у форматах .png, .jpg або .jpeg", toastOptions);
      e.target.value = null;
      return;
    }
    const imgUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(imgUrl);
    setIsImageChange(true);
  };

  const onSubmit = async data => {
    const file = data.image;
    const formData = new FormData();
    formData.append("image", file);

    //якщо ми не маємо інформації про акцію, створюємо її
    if (!item) {
      try {
        const result = await axios.post(`${baseServerURL}uploads`, formData);

        const createData = {
          ...data,
          image: result.data.img_url,
        };
        createPromotion(createData);
        reset();

        window.location.href = "/admin/access/site/promo";
        return;
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, toastOptions);
      }
    }

    //якщо ми маємо інфо про акцію, оновлюємо дані
    else {
      if (isImageChange) {
        // якщо зображення було змінено
        try {
          const result = await axios.post(`${baseServerURL}uploads`, formData);
          const updateData = {
            ...data,
            image: result.data.img_url,
            _id: item._id,
          };
          updatePromotion(updateData);
          reset();

          window.location.href = "/admin/access/site/promo";
          return;
        } catch (error) {
          console.log(error.message);
          toast.error(error.message, toastOptions);
        }
      }
      try {
        //якщо зображення не змінювалось
        const updateData = {
          ...data,
          _id: item._id,
        };

        updatePromotion(updateData);
        reset();

        window.location.href = "/admin/access/site/promo";
        return;
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, toastOptions);
      }
    }
  };

  const handleReset = fieldName => {
    resetField(fieldName);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[502px] h-[567px] mx-auto mt-8 flex flex-col gap-y-4 relative"
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
          <div className="w-[260px] flex flex-col gap-y-4">
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
          <div className="w-[226px] h-[220px] flex flex-col">
            <p className="text-14 text-beige mb-2">Зображення</p>
            <div className="flex flex-col h-full justify-between">
              <div className="w-full h-[152px] mb-2 border border-beige overflow-hidden">
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="object-contain h-[152px] w-[226px]"
                  />
                )}
              </div>
              <Controller
                name="image"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <label className="w-full h-9 px-2 py-1 flex items-center justify-center gap-x-2 bg-dark-btn-bg  border-beige rounded-[4px] text-beige text-base hover:text-base-orange hover:border-base-orange">
                    <Archive className={"fill-beige"} />
                    Змінити
                    <input
                      name="image"
                      id="image"
                      type="file"
                      className="hidden"
                      onChange={e => {
                        field.onChange(e.target.files[0]);
                        handleFileChange(e);
                      }}
                      accept=".png, .jpg, .jpeg"
                    />
                  </label>
                )}
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-base-brown mt-4">
          * поля позначені зірочкою обов’язкові для заповнення{" "}
        </p>
        {/* кнопки */}

        {type === "create" ? (
          <div className="w-fit flex items-center gap-x-5 mx-auto">
            <Button type="submit" style={"orange"}>
              Створити
            </Button>
          </div>
        ) : (
          <div className="w-fit flex flex-col items-center gap-y-4 mx-auto absolute top-0 -right-[200px]">
            <Button type="submit" style={"orange"}>
              Зберігти
            </Button>
            <Button
              type="submit"
              style={"beige"}
              btnClass="flex items-center justify-center gap-x-[6px] btn-archive"
            >
              <Archive className={"fill-beige"} />
              Архівувати
            </Button>
            <Button
              type="submit"
              style={"beige"}
              btnClass="flex items-center justify-center gap-x-[6px] btn-show"
            >
              <Show className={"fill-beige"} />
              Приховати
            </Button>
            <Button
              style={"beige"}
              btnClass="flex items-center justify-center gap-x-[6px] trash"
              // clickFn={() => setIsOpenModalConfirm(true)}
            >
              <Trash className={"fill-beige w-4 h-4 trash-icon"} /> Видалити
            </Button>
          </div>
        )}
      </form>
    </>
  );
});

export default PromoForm;
