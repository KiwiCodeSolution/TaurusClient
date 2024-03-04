import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { baseStyleInput, baseStyleLabel } from "./TextField";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import SelectField from "./SelectField";

const DateTimeField = ({ control, style }) => {
  const day = new Date();
  const today = day.getDate();
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isCalendarOpen, setCalendarOpen] = useState(false);

  const currentDate = selectedDay.getDate();

  console.log(selectedTime);

  //відслідковує, чи відкритий календар. в залежності від цього змінює положення іконки-стрілочки
  const handleIconClick = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  //локалізація для каледаря, інакше виводить інформацію англійською
  registerLocale("uk", uk);
  setDefaultLocale("uk");

  //створюємо масив часу для відображення у полі "час"
  const generateTimeArray = () => {
    const startTime = new Date();
    startTime.setHours(8, 0, 0); // Початковий час: 8:00
    const endTime = new Date();
    endTime.setHours(21, 0, 0); // Кінцевий час: 21:00

    const timeArray = [];

    if (selectedDay === today && selectedTime.value > "20:00") {
      console.log("alarm!");
    }

    while (startTime < endTime) {
      const value = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      timeArray.push({ value, label: value });
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return timeArray;
  };

  // отримуємо масив даних для вибору часу
  const time = generateTimeArray();

  return (
    <>
      {/* ------------------ date --------------- */}
      <Controller
        name="date"
        control={control}
        render={({ field }) => (
          <div className={`w-[118px] h-full flex flex-col gap-y-2 relative ${style}`}>
            <label htmlFor="date" className={`${baseStyleLabel}`}>
              Дата <span className="text-base-orange">*</span>
            </label>
            <DatePicker
              {...field}
              name="date"
              selected={field.value || day}
              onChange={(date) => {
                field.onChange(date);
                setSelectedDay(date);
              }}
              onClickOutside={handleIconClick}
              placeholderText="Оберіть дату"
              locale="uk"
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md outline-none bg-base-back text-lite-yellow text-opacity-40 pl-[2px]"
            />
          </div>
        )}
      />

      {/* ------------------ time --------------- */}
      <Controller
        name="time"
        control={control}
        render={({ field }) => (
          <>
            <SelectField
              options={time}
              {...field}
              name="time"
              isSearchable={true}
              placeholder="Оберіть час"
              label="Час"
              onChange={(selectedOption) => {
                field.onChange(selectedOption);
                setSelectedTime(selectedOption); // Зберегти обраний час у стані
              }}
            />
          </>
        )}
      />
    </>
  );
};

DateTimeField.propTypes = {
  control: PropTypes.object.isRequired,
  style: PropTypes.string,
};

export default DateTimeField;
