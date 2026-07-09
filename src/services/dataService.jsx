import axios from "axios";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const goalService = async () => {
  try {
    const response = await axios.get(`${API_URL}/goals`, getAuthHeaders());
    return response.data.data[0];
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};

export const expensesService = async () => {
  try {
    const response = await axios.get(`${API_URL}/expenses`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};

export const billsService = async () => {
  try {
    const response = await axios.get(`${API_URL}/bills`, getAuthHeaders());
    return response.data;
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};
