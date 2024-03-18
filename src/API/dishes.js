import axios from "axios";
import { toast } from "react-toastify";
import { baseServerURL } from "./config";

const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const getDishes = async () => {
  try {
    const result = await axios.get(`${baseServerURL}product`);

    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const createDish = async (dish) => {
  try {
    const result = await axios.post(`${baseServerURL}product`, dish);

    toast.success("Нову страву додано!", options);
    return result;
  } catch (error) {
    if (error.request.statusText === "Conflict") {
      toast.error("Така страва вже існує!", options);
    }
    return { error: error.message };
  }
};

export const updateDish = async (dish) => {
  try {
    const result = await axios.put(`${baseServerURL}product/${dish._id}`, { ...dish });
    toast.success("Інформацію оновлено!", options);
    return result;
  } catch (error) {
    toast.error("Такої страви не існує!", options);
    return { error: error.message };
  }
};

export const deleteDish = async (dish) => {
  try {
    const result = await axios.delete(`${baseServerURL}product/${dish._id}`);
    toast.success("Страву видалено!", options);
    return result;
  } catch (error) {
    toast.error("Такої страви не існує!", options);
    return { error: error.message };
  }
};
