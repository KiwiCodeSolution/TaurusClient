import axios from "axios";

import { baseServerURL } from "./config";

export const sendFeedback = async data => {
  try {
    const result = await axios.post(`${baseServerURL}feedback`, data);
    console.log("result", result);

    return result;
  } catch (error) {
    return { error: error.message };
  }
};
