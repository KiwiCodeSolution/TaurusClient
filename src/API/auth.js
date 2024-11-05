import axios from "axios";
import { baseServerURL } from "./config";

export const login = async user => {
  try {
    const result = await axios.post(`${baseServerURL}auth/login`, user);

    return result.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const currentUser = async token => {
  try {
    const result = await axios.get(`${baseServerURL}auth/getCurrent`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  } catch (error) {
    return { error: error.message };
  }
};

export const logout = async token => {
  try {
    await axios.get(`${baseServerURL}auth/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return;
  } catch (error) {
    return { error: error.message };
  }
};
