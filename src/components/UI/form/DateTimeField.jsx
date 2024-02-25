import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { ArrowDown } from "../../../icons/iconComponent";
import { baseStyleInput, baseStyleLabel } from "./TextField";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";

const DateTimeField = ({ name, control, placeholder, style, type, label }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [iconComponent, setIconComponent] = useState(
    <ArrowDown className="stroke-liteGray hover:stroke-lavender focus:stroke-lavender" />
  );

  const handleIconClick = () => {
    // Toggle calendar visibility
    setCalendarOpen(!isCalendarOpen);
  };

  registerLocale("uk", uk);
  setDefaultLocale("uk");

  const [isCalendarOpen, setCalendarOpen] = useState(false);

  return (
    <>
      {type === "date" ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className={`w-[118px] h-full flex flex-col gap-y-2 relative ${style}`}>
              <label htmlFor={name} className={`${baseStyleLabel}`}>
                {label} <span className="text-base-orange">*</span>
              </label>
              <DatePicker
                {...field}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                onClickOutside={handleIconClick}
                placeholderText={placeholder}
                locale="uk"
                dateFormat="dd/MM/yyyy"
                className="w-full rounded-md outline-none bg-base-back text-lite-yellow text-opacity-40 pl-[2px]"
              />
            </div>
          )}
        />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className={`w-[118px] h-full flex flex-col gap-y-2 relative ${style}`}>
              <label htmlFor={name} className={`${baseStyleLabel}`}>
                {label} <span className="text-base-orange">*</span>
              </label>
              <DatePicker
                {...field}
                selected={startDate}
                locale="uk"
                onChange={(date) => setStartDate(date)}
                onFocus={() => {
                  setIconComponent(<ArrowDown />);
                }}
                onBlur={() => {
                  setIconComponent(<ArrowDown />);
                }}
                onClickOutside={handleIconClick}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                minTime={new Date(0, 0, 0, 10, 0)}
                maxTime={new Date(0, 0, 0, 20, 0)}
                dateFormat="H:mm"
                className="w-full rounded-md outline-none bg-base-back text-lite-yellow text-opacity-40 pl-[2px]"
              />
              <input type="time" min="09:00" max="18:00" step="900" className={`${baseStyleInput}`} />
            </div>
          )}
        />
      )}
    </>
  );
};

DateTimeField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  style: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DateTimeField;
