import axios from "axios";
import { toast } from "react-toastify";
import { baseServerURL } from "./config";
import { toastOptions } from "../helpers/styles";
import orderStore from "../store/order";

export const getAllOrders = async () => {
  try {
    const result = await axios.get(`${baseServerURL}order`);
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const createOrder = async order => {
  try {
    const result = await axios.post(`${baseServerURL}order`, order);
    orderStore.clearOrderedProductList();
    return result;
  } catch (error) {
    console.log(error.message);
    toast.error("Вибачте, сталася помилка! Спробуйте ще раз через кілька хвилин.", toastOptions);
    return { error: error.message };
  }
};

export const updateOrder = async order => {
  try {
    const result = await axios.put(`${baseServerURL}order/${order._id}`, { ...order });
    console.log(result.data);
    return result;
  } catch (error) {
    console.log(error.message);
    toast.error("Вибачте, сталася помилка! Спробуйте ще раз через кілька хвилин.", toastOptions);
    return { error: error.message };
  }
};

export const deleteOrder = async order => {
  try {
    const result = await axios.delete(`${baseServerURL}order/${order._id}`);
    toast.success("замовлення видалено!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такого замовлення не існує!", toastOptions);
    return { error: error.message };
  }
};
