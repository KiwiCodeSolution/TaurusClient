import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import TextFieldAdmin from "./form/TextFieldAdmin";
import Button from "../components/UI/Button";
// import axios from "axios";
// import { baseServerURL } from "../API/config";
import { Archive, Show, Trash } from "../icons/iconComponent";
// import { useState } from "react";
// import { toastOptions } from "../API/dishes";

import SelectFieldAdmin from "./form/SelectFieldAdmin";

const FIELDS = [
  {
    id: "1",
    name: "userName",
    label: "Повне ім’я користувача",
    style: "",
    isRequired: true,
    type: "input",
  },
  {
    id: "2",
    name: "role",
    label: "Роль",
    style: "",
    isRequired: true,
    type: "input",
  },

  {
    id: "3",
    name: "login",
    label: "Логін користувача",
    style: "",
    isRequired: true,
    type: "input",
  },

  {
    id: "4",
    name: "password",
    label: "Пароль",
    style: "",
    isRequired: true,
    type: "input",
  },
];

const roleOptions = [
  { value: "обмежений", label: "обмежений" },
  { value: "розширений", label: "розширений" },
  { value: "повний", label: "повний" },
];

const UsersForm = observer(({ user, type }) => {
  const defaultValues = {
    _id: user?._id || "",
    userName: user?.userName || "",
    role: user?.role || "",
    login: user?.login || "",
    password: user?.password || "",
    access_type: user?.access_type || "",
  };

  const { control, handleSubmit, reset, resetField } = useForm({
    mode: "all",
    defaultValues: defaultValues,
  });

  const onSubmit = async data => {
    console.log(data);
  };

  const handleReset = fieldName => {
    resetField(fieldName);
  };

  return (
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

      <Controller
        name="access_type"
        control={control}
        render={({ field }) => (
          <>
            <SelectFieldAdmin
              {...field}
              control={control}
              options={roleOptions}
              name="access_type"
              isSearchable={true}
              label="Тип доступу"
              style={"w-full"}
              isRequired
            />
          </>
        )}
      />

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
  );
});

export default UsersForm;
