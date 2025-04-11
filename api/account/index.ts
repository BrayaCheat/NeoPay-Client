import axios from "../axiosInstance"

export const getAccount = async (userId: number) => {
  return (await axios.get(`/api/v1/accounts/user/${userId}`)).data;
}