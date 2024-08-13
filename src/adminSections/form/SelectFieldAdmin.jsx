import { forwardRef, useState } from "react";
import Select, { components } from "react-select";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { ArrowDown } from "../../icons/iconComponent";

const SelectFieldAdmin = forwardRef(
  ({ control, options, value, onChange, name, style, label, isRequired, placeholder }, ref) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const inputId = `${name}-input`;

    const { fieldState } = useController({
      name,
      control,
      rules: { required: "Це поле обов'язкове" },
    });

    const DropdownIndicator = props => {
      return (
        <components.DropdownIndicator {...props}>
          <ArrowDown
            className={`${menuIsOpen && "rotate-180"} stroke-beige hover:stroke-base-orange`}
          />
        </components.DropdownIndicator>
      );
    };

    const customStyles = {
      control: provided => ({
        ...provided,
        backgroundColor: "#33302D",
        overflow: "hidden",
        outline: "none",
        border: "0",
        transition: "border-color 0.3s", // Додайте плавний перехід
        "&:hover": {
          borderColor: "#F7A033", // Змініть на бажаний колір бордера при ховері
        },
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }),
      menuList: provided => ({
        ...provided,
        // Приховуємо скроллбар для всіх браузерів
        "::-webkit-scrollbar": {
          display: "none",
        },
        scrollbarWidth: "none", // для Firefox
        msOverflowStyle: "none", // для IE і Edge
      }),
      menu: provided => ({
        ...provided,
        backgroundColor: "#33302D", // Змініть розмір фону за необхідності
      }),
      option: (provided, state) => {
        return {
          ...provided,
          backgroundColor: state.isSelected ? "#7E664D" : "#33302D",
          color: state.isSelected ? "#F7A033" : "#ECDDC6",
          "&:hover": {
            backgroundColor: "#ECDDC6",
            color: "#33302D",
          },

          borderBottom: "1px solid #7E664D",
          borderColor: "#7E664D",
          "&:last-child": {
            borderBottom: "none", // видаляємо бордер у останнього елементу
          },
        };
      },
      singleValue: provided => ({
        ...provided,
        color: "#ECDDC6",
        opacity: 0.4, // змініть на бажаний колір тексту
      }),
    };

    return (
      <div className="flex flex-col gap-y-2 relative">
        <label htmlFor={inputId} className="text-14 text-beige">
          {label} {isRequired && <span className="text-base-orange">*</span>}
        </label>
        <Select
          inputId={inputId}
          components={{ DropdownIndicator }}
          ref={ref}
          options={options}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          isSearchable={true}
          onMenuOpen={() => setMenuIsOpen(true)}
          onMenuClose={() => setMenuIsOpen(false)}
          menuIsOpen={menuIsOpen}
          className={`${style} p-0`}
          name={name}
          styles={customStyles}
        />
        {fieldState.error && (
          <span className="absolute -bottom-4 left-0 text-14 text-base-orange italic z-10">
            {fieldState.error.message}
          </span>
        )}
      </div>
    );
  }
);

SelectFieldAdmin.displayName = { name };

SelectFieldAdmin.propTypes = {
  control: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default SelectFieldAdmin;
