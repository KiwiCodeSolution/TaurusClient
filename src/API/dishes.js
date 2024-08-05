import axios from "axios";
import { toast } from "react-toastify";
import { baseServerURL } from "./config";
import { toastOptions } from "../helpers/styles";

export const getDishes = async () => {
  try {
    const result = await axios.get(`${baseServerURL}product`);

    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const createDish = async (dish, token) => {
  try {
    const result = await axios.post(`${baseServerURL}product`, dish, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("Нову страву додано!", toastOptions);
    return result;
  } catch (error) {
    if (error.request.statusText === "Conflict") {
      toast.error("Така страва вже існує!", toastOptions);
    }
    return { error: error.message };
  }
};

export const updateDish = async (dish, token) => {
  try {
    const result = await axios.put(
      `${baseServerURL}product/${dish._id}`,
      { ...dish },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Інформацію оновлено!", toastOptions);

    return result;
  } catch (error) {
    toast.error("Такої страви не існує!", toastOptions);
    return { error: error.message };
  }
};

export const updateDishAvailable = async (dish, token) => {
  try {
    const updatedDish = { available: dish.available }; // Створюємо об'єкт тільки з полем available
    const result = await axios.put(`${baseServerURL}product/${dish._id}`, updatedDish, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Інформацію оновлено!", toastOptions);

    return result;
  } catch (error) {
    toast.error("Такої страви не існує!", toastOptions);
    return { error };
  }
};

export const deleteDish = async (dish, token) => {
  try {
    const result = await axios.delete(`${baseServerURL}product/${dish._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Страву видалено!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такої страви не існує!", toastOptions);
    return { error: error.message };
  }
};
