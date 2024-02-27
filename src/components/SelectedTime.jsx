import SelectField from "./UI/form/SelectField";

function TimeArray() {
  const generateTimeArray = () => {
    const startTime = new Date();
    startTime.setHours(8, 0, 0); // Початковий час: 8:00
    const endTime = new Date();
    endTime.setHours(21, 0, 0); // Кінцевий час: 21:00

    const timeArray = [];

    while (startTime < endTime) {
      const value = startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      timeArray.push({ value, label: value });
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return timeArray;
  };

  const time = generateTimeArray();

  return (
    <div>
      <SelectField options={time} isSearchable={true} placeholder="Оберіть час" label="Час" name="times" />
      {/* {time.map((item, index) => (
        <div key={index}>{item.label}</div>
      ))} */}
    </div>
  );
}

export default TimeArray;
