import { useController } from "react-hook-form";
import PropTypes from "prop-types";
// import { Cross } from "../../../icons/IconsComponents";
const baseStyleInput =
  "border-b-[0.5px] border-base-brown bg-base-back placeholder:text-16 placeholder:text-lite-yellow placeholder:text-opacity-40 outline-none";

const baseStyleLabel = "text-14 text-lite-yellow";
// const baseStyleError = 'text-pink text-xs text-right absolute -bottom-5 right-0';

const TextField = ({ control, name, defaultValue, placeholder, onReset, type, style, label }) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    rules: { required: "Це поле обов'язкове" },
  });

  return (
    <div className={`flex flex-col gap-y-2 ${style} relative`}>
      <label className={`${baseStyleLabel}`}>{label}</label>
      {type === "input" ? (
        <>
          <input {...field} placeholder={placeholder} className={`${fieldState.error ? "" : ""} ${baseStyleInput}`} />
        </>
      ) : (
        <>
          <textarea
            {...field}
            placeholder={placeholder}
            className={`h-[92px] ${style} ${fieldState.error ? "" : ""} ${baseStyleInput}`}
            style={{
              resize: "none",
            }}
          />
        </>
      )}

      <button type="button" className="absolute right-0">
        {/* <Cross className={`${fieldState.error ? "stroke-pink" : "stroke-lavender"}`} /> */} reset
      </button>
      {fieldState.error && (
        <span className="absolute -bottom-3 left-0 text-red-600 italic">{fieldState.error.message}</span>
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
