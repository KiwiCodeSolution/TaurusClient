import PropTypes from "prop-types";
import { useState } from "react";
import { useController } from "react-hook-form";

const FileFieldAdmin = ({ control, name, defaultValue, onReset, style, label, isRequired }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  const handleImageChange = e => {
    const file = e.target.files[0]; // Отримати перший файл з події onChange
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result); // Оновлення стану зображення для попереднього перегляду
      };
      reader.readAsDataURL(file); // Створення Data URL зображення
      field.onChange(file); // Оновлення значення форми
    }
  };

  return (
    <label className="flex flex-col">
      {label}
      <input
        name={name}
        id={name}
        type="file"
        className="w-[125px] h-9 px-2 py-1 bg-dark-btn-bg rounded-[4px]"
        {...field}
        onChange={handleImageChange} // Передавання функції handleImageChange безпосередньо
      />
      {previewImage && (
        <img src={previewImage} alt="Preview" className="mt-2" style={{ maxWidth: "100px" }} />
      )}
    </label>
  );
};

FileFieldAdmin.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onReset: PropTypes.func.isRequired,
  style: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default FileFieldAdmin;
