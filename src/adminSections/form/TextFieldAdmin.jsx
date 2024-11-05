import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { Cross } from "../../icons/iconComponent";

const TextFieldAdmin = ({
  control,
  name,
  defaultValue,
  onReset,
  style,
  label,
  isRequired,
  type,
  placeholder,
}) => {
  const rules = isRequired ? { required: "Це поле обов'язкове" } : {};

  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    rules,
  });

  return (
    <div className={`flex flex-col relative ${style}`}>
      <label htmlFor={name} className="text-14 text-beige mb-2">
        {label} {isRequired && <span className="text-base-orange">*</span>}
      </label>
      {type === "input" ? (
        <input
          name={name}
          id={name}
          type="input"
          className={`${name === "title" || name === "name" ? "uppercase" : ""} ${
            fieldState.error ? "border-[1px] border-base-orange focus:outline-none" : ""
          } h-9 px-2 py-1 bg-dark-btn-bg rounded-[4px]  text-beige focus:outline outline-offset-1 outline-1 outline-beige `}
          {...field}
          value={field.value}
        />
      ) : (
        <textarea
          {...field}
          placeholder={placeholder}
          name={name}
          className={`px-2 py-1 text-beige bg-dark-btn-bg rounded-[4px] focus:outline outline-offset-1 outline-1 outline-beige ${
            fieldState.error ? "border-[1px] border-base-orange focus:outline-none" : ""
          }`}
        />
      )}
      <button
        type="button"
        className="absolute top-1/2 right-0 form_button"
        onClick={() => onReset({ name })}
      >
        <Cross className={"icon"} />
      </button>
      {fieldState.error && (
        <span className="absolute -bottom-4 left-0 text-14 text-base-orange italic">
          {fieldState.error.message}
        </span>
      )}
    </div>
  );
};

TextFieldAdmin.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onReset: PropTypes.func.isRequired,
  style: PropTypes.string,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export default TextFieldAdmin;
