import axios from "axios";
import { toast } from "react-toastify";
import { baseServerURL } from "./config";
import { toastOptions } from "../helpers/styles";

export const sendReserve = async data => {
  try {
    const result = await axios.post(`${baseServerURL}reservations`, data);

    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const getAllReserves = async token => {
  try {
    const result = await axios.get(`${baseServerURL}reservations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (error) {
    toast.error("Щось сталося! ми не отримали інформацію про звернення!", toastOptions);
    return { error: error.message };
  }
};

export const updateReserve = async (data, token) => {
  try {
    const result = await axios.put(
      `${baseServerURL}reservations/${data._id}`,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Інформацію оновлено!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такого звернення не існує!", toastOptions);
    return { error: error.message };
  }
};

export const deleteReserve = async (data, token) => {
  try {
    const result = await axios.delete(`${baseServerURL}reservations/${data._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Звернення видалено!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такого звернення не існує!", toastOptions);
    return { error: error.message };
  }
};
