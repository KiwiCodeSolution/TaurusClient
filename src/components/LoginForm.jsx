import { useForm } from "react-hook-form";
import { observer } from "mobx-react-lite";

import { useState } from "react";
import { Check, Hide, Show } from "../icons/iconComponent";
import Button from "./UI/Button";
import authState from "../store/auth";

const Information = () => {
  return (
    <div className="w-[428px] h-[81px] p-4 rounded bg-dark-btn-bg border border-base-brown flex items-center text-center text-14 text-lite-yellow gap-x-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      Для відновлення пароля зверніться до адміністратора
    </div>
  );
};

const LoginForm = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [info, setInfo] = useState(false);

  // const navigate = useNavigate();

  const onSubmit = data => {
    console.log(data);
    authState.setIsAuth(true);
    console.log(authState.isAuth);
    reset();
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="w-[578px] h-[460px] bg-base-back border border-base-brown p-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="w-[333px] mb-10 text-center uppercase text-xl leading-6 mx-auto text-lite-yellow">
        Доступ для управління сайтом
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[498px} flex flex-col gap-y-4 relative"
        autoComplete={rememberMe ? "on" : "off"}
      >
        <label className="flex flex-col gap-y-2 relative">
          <span className="text-14 text-lite-yellow">Логін:</span>
          <input
            type="text"
            {...register("text", { required: true })}
            placeholder="Введіть Ваш логін"
            className={`${
              errors.email && "border-b border-base-orange"
            } h-9 p-2 bg-dark-btn-bg text-lite-yellow placeholder:text-lite-yellow placeholder:text-opacity-50 placeholder:text-16 outline-none`}
            autoComplete={rememberMe ? "name" : "off"}
          />
          {errors.text && (
            <span className="absolute -bottom-4 left-0 text-14 text-base-orange italic">
              Це поле обов&apos;язкове
            </span>
          )}
        </label>
        <label className="flex flex-col gap-y-2 relative">
          <span className="text-14 text-lite-yellow">Пароль:</span>

          <input
            type={passwordVisible ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="Введіть пароль"
            className={`${
              errors.password && "border-b border-base-orange"
            } h-9 p-2 bg-dark-btn-bg text-lite-yellow placeholder:text-lite-yellow placeholder:text-opacity-50 placeholder:text-16 outline-none`}
            autoComplete={rememberMe ? "password" : "off"}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-2 password-btn h-6 w-6"
          >
            {passwordVisible ? <Hide /> : <Show />}
          </button>

          {errors.password && (
            <span className="absolute -bottom-4 left-0 text-14 text-base-orange italic">
              Це поле обов&apos;язкове
            </span>
          )}
        </label>
        <div className="w-full flex justify-between mt-4">
          <div className="flex text-14 text-lite-yellow">
            <label className="text-14 flex w-full gap-x-2">
              <input
                type="checkbox"
                className="appearance-none absolute"
                checked={rememberMe}
                onClick={() => setRememberMe(!rememberMe)}
                onChange={handleRememberMeChange}
                name="rememberMe"
              />
              <span className={`w-5 h-5 border border-base-brown rounded-[4px] `}>
                {rememberMe && <Check />}
              </span>
              Запам’ятати пароль
            </label>
          </div>
          <p
            className="text-14 text-base-yellow"
            onMouseEnter={() => setInfo(true)}
            onMouseLeave={() => setInfo(false)}
          >
            Забули пароль?
          </p>
        </div>

        <Button style={"orange"} btnClass="mt-6 text-center text-18 font-medium" type="submit">
          Увійти
        </Button>
      </form>
      {info && <Information />}
    </div>
  );
});

export default LoginForm;
