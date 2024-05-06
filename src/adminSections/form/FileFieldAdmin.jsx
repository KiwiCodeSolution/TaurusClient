import PropTypes from "prop-types";
import { useState } from "react";
import { useController } from "react-hook-form";
import { Archive } from "../../icons/iconComponent";

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
    <div className="flex flex-col mt-4 w-[287px]">
      <p className="text-14 text-beige mb-2">Зображення</p>
      <div className="flex justify-between">
        <div className="w-[146px] h-[113px] border border-beige">
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="object-cover"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
        <label className="w-[125px] h-9 px-2 py-1 flex items-center justify-center gap-x-2 bg-dark-btn-bg border border-beige rounded-[4px] text-beige text-base hover:text-base-orange hover:border-base-orange">
          <Archive className={"fill-beige"} />
          {label}

          <input
            {...field}
            name={name}
            id={name}
            type="file"
            className=" hidden"
            onChange={event => {
              field.onChange(event.target.value); // data send back to hook form
              handleFileChange(event); // UI state
            }} // Передавання функції handleImageChange безпосередньо
          />
        </label>
      </div>
    </div>
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
