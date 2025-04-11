import axios from '../axiosInstance'

export const getUserDetail = async () => {
  return (await axios.get(`/api/v1/users/me`)).data;
}