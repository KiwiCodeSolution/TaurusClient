import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { forwardRef, useState } from "react";
import { Check } from "../../../icons/iconComponent";

const ChexboxField = forwardRef(({ control, label, name }, ref) => {
  const [isChecked, setIsChecked] = useState(false);

  const { field, fieldState } = useController({
    name,
    control,
    rules: { required: "Це поле обов'язкове" },
    defaultValue: false,
  });

  return (
    <div className="relative">
      <label className="text-14 text-base-brown flex w-full gap-x-2">
        <input
          type="checkbox"
          {...field}
          ref={ref}
          className="appearance-none absolute"
          checked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />
        <span
          className={`w-5 h-5 border rounded-[4px] ${fieldState.error ? "border-base-orange" : "border-base-brown"}`}
        >
          {isChecked && <Check />}
        </span>
        {label}
      </label>
      {/* Покажіть текст помилки, якщо він є */}
      {fieldState.error && (
        <span className="absolute -bottom-5 left-0 text-14 text-base-orange italic">{fieldState.error.message}</span>
      )}
    </div>
  );
});

ChexboxField.displayName = { name };

ChexboxField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default ChexboxField;
