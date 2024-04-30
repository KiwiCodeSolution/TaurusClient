import PropTypes from "prop-types";
import { useState } from "react";
import { useController } from "react-hook-form";

const FileFieldAdmin = ({ control, name, onReset, style, label, isRequired }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const { field } = useController({
    name,
    control,
  });

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    const urlImage = URL.createObjectURL(selectedFile);

    setPreviewImage(urlImage);
  };

  return (
    <label className="flex flex-col">
      {label}
      <div className="flex">
        <div className="w-[50%]">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 object-cover"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>

        <input
          {...field}
          name={name}
          id={name}
          type="file"
          className="w-[125px] h-9 px-2 py-1 bg-dark-btn-bg rounded-[4px]"
          onChange={event => {
            field.onChange(event.target.value); // data send back to hook form
            handleFileChange(event); // UI state
          }} // Передавання функції handleImageChange безпосередньо
        />
      </div>
    </label>
  );
};

FileFieldAdmin.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.object,
  onReset: PropTypes.func.isRequired,
  style: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default FileFieldAdmin;
