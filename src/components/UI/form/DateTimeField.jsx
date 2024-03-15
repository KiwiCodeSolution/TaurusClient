import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { useState } from "react";
import { baseStyleLabel } from "./TextField";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import uk from "date-fns/locale/uk";
import SelectField from "./SelectField";
import { ArrowDown } from "../../../icons/iconComponent";

const DateTimeField = ({ control, namePage }) => {
  //локалізація для каледаря, інакше виводить інформацію англійською
  registerLocale("uk", uk);
  setDefaultLocale("uk");

  const day = new Date();
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  //відслідковує, чи відкритий календар. в залежності від цього змінює положення іконки-стрілочки
  const handleIconClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  //створюємо масив часу для відображення у полі "час"
  const generateTimeArray = () => {
    const todayFormatted = moment(day).format("DD-MM-YYYY");
    const daySelectedFormatted = moment(selectedDay).format("DD-MM-YYYY");
    const currentTime = moment().format("HH:mm");
    const currentTimeFormatted = moment(currentTime, "HH:mm");
    const maxTime = moment("20:00", "HH:mm");

    let startTime = new Date();
    let endTime = new Date();

    if (todayFormatted === daySelectedFormatted) {
      const currentTodayTime = moment().add(1, "hour").format("HH");
      startTime.setHours(currentTodayTime, 0, 0); // Початковий час: 8:00
    } else {
      startTime.setHours(8, 0, 0); // Початковий час: 8:00
    }

    endTime.setHours(21, 0, 0); // Кінцевий час: 21:00

    const timeArray = [];

    if (selectedTime && todayFormatted === daySelectedFormatted && currentTimeFormatted._d > maxTime._d) {
      //повертаємо пустий масив. у цьому разі далі по коду спрацьовують перевірки та нотифікашки.

      return [];
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
          <div
            className={`${
              namePage === "order" ? "w-[241px]" : "w-[118px]"
            } h-[59px] border-b-[0.5px] border-base-brown flex flex-col gap-y-2 relative date-picker`}
          >
            <label htmlFor="date" className={`${baseStyleLabel} date`}>
              Дата <span className="text-base-orange">*</span>
            </label>
            <DatePicker
              {...field}
              control={control}
              name="date"
              selected={selectedDay || day}
              onChange={(date) => {
                field.onChange(date);
                setSelectedDay(date);
                setIsCalendarOpen(false); // Закрити календар після вибору дати
              }}
              open={isCalendarOpen}
              onBlur={() => setIsCalendarOpen(false)} // Додано обробник події onBlur
              wrapperClassName="w-full"
              placeholderText="Оберіть дату"
              locale="uk"
              dateFormat="dd/MM/yyyy"
              className="w-full rounded-md outline-none bg-base-back text-lite-yellow text-opacity-40 pl-[2px] cursor-default"
            />

            <button
              type="button"
              className="calendar_button w-7 h-full absolute top-0 right-0"
              onClick={handleIconClick}
            >
              <ArrowDown className={`absolute top-[34px] left-1/3 ${isCalendarOpen && "rotate-180"} `} />
            </button>
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
              control={control}
              name="time"
              isSearchable={true}
              placeholder={time.length === 0 ? "Оберіть інший день" : "Оберіть час"}
              label="Час"
              onChange={(selectedOption) => {
                field.onChange(selectedOption);
                setSelectedTime(selectedOption); // Зберегти обраний час у стані
              }}
              fontSizePlaceholder={time.length === 0 ? "11px" : ""}
              namePage={namePage}
            />
          </>
        )}
      />
    </>
  );
};

DateTimeField.propTypes = {
  control: PropTypes.object.isRequired,
  namePage: PropTypes.string,
};

export default DateTimeField;
