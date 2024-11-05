import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { forwardRef } from "react";
import { Check } from "../../icons/iconComponent";

const RadioFieldAdmin = forwardRef(({ control, label, name, onChecked, isCheck }, ref) => {
  const { field } = useController({
    name,
    control,
    defaultValue: false,
  });

  return (
    <div className="relative">
      <label className={`text-14 text-beige flex w-full gap-x-2`}>
        <input
          type="checkbox"
          {...field}
          ref={ref}
          className="appearance-none absolute"
          checked={isCheck}
          onClick={onChecked}
        />
        <span className={`w-5 h-5 border rounded-full border-base-brown`}>
          {isCheck && <Check />}
        </span>
        {label}
      </label>
    </div>
  );
});

RadioFieldAdmin.displayName = { name };

RadioFieldAdmin.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  style: PropTypes.string,
  isCheck: PropTypes.bool.isRequired,
  onChecked: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  section: PropTypes.string,
};

export default RadioFieldAdmin;
