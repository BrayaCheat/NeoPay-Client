import axios from "../axiosInstance";
import baseAxios from "axios";

export const getAccount = async (userId: number | undefined) => {
  return (await axios.get(`/api/v1/accounts/user/${userId}`)).data;
};

export const createAccount = async (
  userId: number,
  accountName: string,
  accountType: string
) => {
  const body = {
    userId: userId,
    accountName: accountName,
    accountType: accountType,
  };
  return (await axios.post(`/api/v1/accounts`, body)).data;
};

export const deleteAccount = async (accountId: number) => {
  try {
    const response = await axios.delete(`/api/v1/accounts/${accountId}`);
    return response.data;
  } catch (error: any) {
    if (baseAxios.isAxiosError(error)) {
      return error.response?.data
    }
  }
};

