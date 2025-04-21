import axios from "../axiosInstance";

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
