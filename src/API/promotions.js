import axios from "axios";
import { toast } from "react-toastify";
import { baseServerURL } from "./config";

export const options = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

export const getAllPromotions = async () => {
  try {
    const result = await axios.get(`${baseServerURL}promotions`);
    console.log(result);
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const createPromotion = async promo => {
  try {
    const result = await axios.post(`${baseServerURL}promotions`, promo);

    toast.success("Нову акцію додано!", options);
    return result;
  } catch (error) {
    if (error.request.statusText === "Conflict") {
      toast.error("Така акція вже існує!", options);
    }
    return { error: error.message };
  }
};

export const updatePromotion = async promo => {
  try {
    const result = await axios.put(`${baseServerURL}promotions/${promo._id}`, { ...promo });
    toast.success("Інформацію оновлено!", options);
    return result;
  } catch (error) {
    toast.error("Такої акції не існує!", options);
    return { error: error.message };
  }
};

export const deletePromotion = async promo => {
  try {
    const result = await axios.delete(`${baseServerURL}promotions/${promo._id}`);
    toast.success("Акцію видалено!", options);
    return result;
  } catch (error) {
    toast.error("Такої акції не існує!", options);
    return { error: error.message };
  }
};
