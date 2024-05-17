import axios from "axios";
import { toast } from "react-toastify";
import { baseServerURL } from "./config";
import { toastOptions } from "../helpers/styles";

export const getAllOrders = async () => {
  try {
    const result = await axios.get(`${baseServerURL}promotions`);

    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const createOrder = async order => {
  try {
    const result = await axios.post(`${baseServerURL}order`, order);

    return result;
  } catch (error) {
    if (error.request.statusText === "Conflict") {
      toast.error("Така акція вже існує!", toastOptions);
    }
    return { error: error.message };
  }
};

export const deleteOrder = async order => {
  try {
    const result = await axios.delete(`${baseServerURL}order/${order._id}`);
    toast.success("Акцію видалено!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такої акції не існує!", toastOptions);
    return { error: error.message };
  }
};
