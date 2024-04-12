import PropTypes from "prop-types";
import { useController } from "react-hook-form";
import { Cross } from "../../icons/iconComponent";

const TextFieldAdmin = ({ control, name, defaultValue, onReset, style, label, isRequired }) => {
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <div className={`flex flex-col relative ${style}`}>
      <label htmlFor={name} className="text-14 text-beige mb-2">
        {label} {isRequired && <span className="text-base-orange">*</span>}
      </label>
      <input
        name={name}
        id={name}
        type="input"
        className={`${
          name === "name" ? "uppercase" : ""
        } h-9 bg-dark-btn-bg text-beige rounded-[4px]`}
        {...field}
        value={field.value}
      />
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
};

export default TextFieldAdmin;
