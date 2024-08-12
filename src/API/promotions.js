import axios from "axios";
import { toast } from "react-toastify";
import { baseServerURL } from "./config";
import { toastOptions } from "../helpers/styles";

export const getAllPromotions = async token => {
  try {
    const result = await axios.get(`${baseServerURL}promotions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const getImage = async fileName => {
  try {
    const result = await axios.get(`${baseServerURL}uploads/${fileName}`);
    console.log(`${baseServerURL}uploads/${fileName}`);
    console.log(result);
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const createPromotion = async (promo, token) => {
  try {
    const result = await axios.post(`${baseServerURL}promotions`, promo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Нову новину додано!", toastOptions);
    return result;
  } catch (error) {
    if (error.request.statusText === "Conflict") {
      toast.error("Така новина вже існує!", toastOptions);
    }
    return { error: error.message };
  }
};

export const updatePromotion = async (promo, token) => {
  try {
    const result = await axios.put(
      `${baseServerURL}promotions/${promo._id}`,
      { ...promo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Інформацію оновлено!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такої новини не існує!", toastOptions);
    return { error: error.message };
  }
};

export const deletePromotion = async (promo, token) => {
  try {
    const result = await axios.delete(`${baseServerURL}promotions/${promo._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Новину видалено!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такої новини не існує!", toastOptions);
    return { error: error.message };
  }
};
