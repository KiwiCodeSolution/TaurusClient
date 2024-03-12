import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { Cross } from "../../../icons/iconComponent";
export const baseStyleInput =
  "border-b-[0.5px] border-base-brown bg-base-back placeholder:text-16 placeholder:text-lite-yellow placeholder:text-opacity-40 outline-none";

export const baseStyleLabel = "text-14 text-lite-yellow";
// const baseStyleError = 'text-pink text-xs text-right absolute -bottom-5 right-0';

const TextField = ({ control, name, defaultValue, placeholder, onReset, type, style, label }) => {
  // Визначаємо правила, якщо тип не є textarea
  const rules = type !== "textarea" ? { required: "Це поле обов'язкове" } : {};

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  return (
    <div className={`flex flex-col gap-y-2 ${style} relative`}>
      <label className={`${baseStyleLabel}`}>
        {label} {type !== "textarea" && <span className="text-base-orange">*</span>}
      </label>
      {type === "input" ? (
        <input
          {...field}
          placeholder={placeholder}
          className={`${fieldState.error && "border-base-orange"} ${baseStyleInput}`}
          name={name}
        />
      ) : type === "email" ? (
        <input
          {...field}
          type="email"
          placeholder={placeholder}
          className={`${fieldState.error && "border-base-orange"} ${baseStyleInput}`}
          name={name}
        />
      ) : (
        <textarea
          {...field}
          placeholder={placeholder}
          className={`h-[92px] ${style} ${fieldState.error && "border-base-orange"} ${baseStyleInput}`}
          name={name}
          style={{
            resize: "none",
          }}
        />
      )}

      <button type="button" className="absolute right-0 form_button" onClick={() => onReset({ name })}>
        <Cross className={"icon"} />
      </button>
      {fieldState.error && (
        <span className="absolute -bottom-4 left-0 text-14 text-base-orange italic">{fieldState.error.message}</span>
      )}
    </div>
  );
};

TextField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default TextField;
