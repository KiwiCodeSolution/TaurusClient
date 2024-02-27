/* eslint-disable react/prop-types */
import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import { baseStyleLabel } from "./TextField";
import { ArrowDown } from "../../../icons/iconComponent";

const SelectField = forwardRef(({ options, value, onChange, name, placeholder, style, label }, ref) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <ArrowDown className={menuIsOpen && "rotate-180"} />
      </components.DropdownIndicator>
    );
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#0C0C09",
      overflow: "hidden",
      outline: "none",
      border: "0",
      transition: "border-color 0.3s", // Додайте плавний перехід
      "&:hover": {
        borderColor: "#F7A033", // Змініть на бажаний колір бордера при ховері
      },
      borderRadius: "0.375rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }),
    menuList: (provided) => ({
      ...provided,
      // Приховуємо скроллбар для всіх браузерів
      "::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none", // для Firefox
      msOverflowStyle: "none", // для IE і Edge
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#0C0C09", // Змініть розмір фону за необхідності
    }),
    option: (provided, state) => {
      const isLastOption = options.indexOf(state.data) === options.length - 1;
      return {
        ...provided,
        backgroundColor: state.isSelected ? "#7E664D" : "#0C0C09",
        color: state.isSelected ? "#F7A033" : "#FFD698",
        "&:hover": {
          backgroundColor: "#FFD698",
          color: "#0C0C09",
        },
        borderBottom: isLastOption ? "0px solid white" : "1px solid #7E664D",
        borderColor: "#7E664D",
      };
    },
    singleValue: (provided) => ({
      ...provided,
      color: "#ECDDC6",
      opacity: 0.4, // змініть на бажаний колір тексту
    }),
  };

  return (
    <div className={`w-[166px] max-h-[53px] flex flex-col relative ${style}`}>
      <label className={`${baseStyleLabel}`}>
        {label} <span className="text-base-orange">*</span>
      </label>
      <Select
        components={{ DropdownIndicator }}
        ref={ref}
        options={options}
        value={value}
        onChange={onChange}
        isSearchable={true}
        placeholder={placeholder}
        styles={customStyles}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        menuIsOpen={menuIsOpen}
        className={`select_persons ${style} p-0 `}
        name={name}
      />
    </div>
  );
});

SelectField.displayName = { name };

SelectField.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export default SelectField;
