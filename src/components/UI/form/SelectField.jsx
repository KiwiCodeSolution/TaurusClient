/* eslint-disable react/prop-types */
import { useController } from "react-hook-form";
import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import { baseStyleLabel } from "./TextField";
import { ArrowDown } from "../../../icons/iconComponent";

const SelectField = forwardRef(
  (
    {
      control,
      options,
      value,
      onChange,
      name,
      placeholder,
      style,
      fontSizePlaceholder,
      label,
      namePage,
    },
    ref
  ) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);

    const { fieldState } = useController({
      name,
      control,
      rules: { required: "Це поле обов'язкове" },
    });

    const isSelectDisabled = options.length === 0;

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
          backgroundColor: "#33302D",
          color: state.isSelected ? "#FFD698" : "rgb(236, 221, 198, 0.6)",
          "&:hover": {
            backgroundColor: "#33302D",
            color: "#FFD698",
          },
          borderBottom: "1px solid #7E664D",
          borderColor: "#7E664D",
        };
      },
      singleValue: provided => ({
        ...provided,
        color: "#ECDDC6",
        opacity: 0.4, // змініть на бажаний колір тексту
      }),
      placeholder: styles => ({
        ...styles,
        color: "#ECDDC6", // колір тексту плейсхолдера
        fontSize: fontSizePlaceholder || "16px",
        opacity: 0.4,
      }),
    };

    return (
      <div
        className={`${
          namePage === "order" ? "w-[135px] xl:w-[241px]" : ""
        } h-[59px] flex flex-col border-b-[0.5px] ${
          fieldState.error ? "border-base-orange" : "border-base-brown"
        } relative ${style}`}
      >
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
          isDisabled={isSelectDisabled}
          onMenuOpen={() => setMenuIsOpen(true)}
          onMenuClose={() => setMenuIsOpen(false)}
          menuIsOpen={menuIsOpen}
          className={`select_persons ${style} p-0 `}
          name={name}
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

SelectField.displayName = { name };

SelectField.propTypes = {
  control: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.object,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.string,
  fontSizePlaceholder: PropTypes.string,
  namePage: PropTypes.string,
};

export default SelectField;
