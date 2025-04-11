import axios from "../axiosInstance"

export const getUserBalance = async (userId: number) => {
  return (await axios.get(`/api/v1/accounts/user/${userId}/balance`)).data
}