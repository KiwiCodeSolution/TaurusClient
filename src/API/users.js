import axios from "axios";

import { baseServerURL } from "./config";

export const getAllUsers = async token => {
  console.log(token);
  try {
    const result = await axios.get(`${baseServerURL}auth/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (error) {
    return { error: error.message };
  }
};
