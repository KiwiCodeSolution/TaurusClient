import "flatpickr/dist/themes/material_green.css";
import PropTypes from "prop-types";
import { useRef } from "react";
import Flatpickr from "react-flatpickr";
import { useController } from "react-hook-form";

const TimeField = ({ control, name }) => {
  const flatpickrRef = useRef(null);
  const { field } = useController({
    name,
    control,
    rules: { required: "Це поле обов'язкове" },
  });

  const defaultTime = new Date();
  defaultTime.setHours(defaultTime.getHours() + 1);

  // Вивід у 24-годинному форматі
  const formattedTime = defaultTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });

  console.log(formattedTime);

  // Функція для отримання мінімального часу згідно з умовами
  const getMinTime = () => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();

    // Якщо поточний час до 7:00, мінімальний час буде 9:00
    if (currentHours < 8) {
      return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), 9, 0);
    }
    // Якщо поточний час у проміжку від 8 до 20, мінімальний час буде поточний + 1 година
    else if (currentHours >= 8 && currentHours < 20) {
      const minTime = new Date(currentTime);
      minTime.setHours(currentTime.getHours() + 1);
      return minTime;
    }
    // Якщо поточний час 20:00 та більше, до 23:59, мінімальний час буде 9:00 наступного дня
    else {
      const nextDay = new Date(currentTime);
      nextDay.setDate(currentTime.getDate() + 1);
      nextDay.setHours(9, 0);
      return nextDay;
    }
  };

  return (
    <Flatpickr
      data-enable-time
      {...field}
      ref={flatpickrRef}
      name={name}
      value={formattedTime}
      options={{
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        altInput: true, // Використовувати стандартний input
        minTime: getMinTime(),
        maxTime: "22:30",
      }}
      className="border-b-[0.5px] border-base-brown bg-base-back placeholder:text-16 placeholder:text-lite-yellow placeholder:text-opacity-40 outline-none"
    />
  );
};

TimeField.propTypes = {
  control: PropTypes.object,
  name: PropTypes.string,
};

export default TimeField;
