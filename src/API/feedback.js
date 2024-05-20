import axios from "axios";
import { toast } from "react-toastify";
import { baseServerURL } from "./config";
import { toastOptions } from "../helpers/styles";

export const sendFeedback = async data => {
  try {
    const result = await axios.post(`${baseServerURL}feedback`, data);
    return result;
  } catch (error) {
    return { error: error.message };
  }
};

export const getAllFeedbacks = async () => {
  try {
    const result = await axios.get(`${baseServerURL}feedback`);
    return result;
  } catch (error) {
    toast.error("Щось сталося! ми не отримали інформацію про звернення!", toastOptions);
    return { error: error.message };
  }
};

export const updateFeedback = async data => {
  try {
    const result = await axios.put(`${baseServerURL}feedback/${data._id}`, { ...data });
    console.log(result.data);
    toast.success("Інформацію оновлено!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такого звернення не існує!", toastOptions);
    return { error: error.message };
  }
};

export const deleteFeedback = async data => {
  try {
    const result = await axios.delete(`${baseServerURL}feedback/${data._id}`);
    toast.success("Звернення архівовано!", toastOptions);
    return result;
  } catch (error) {
    toast.error("Такого звернення не існує!", toastOptions);
    return { error: error.message };
  }
};
