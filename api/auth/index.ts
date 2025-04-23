import axios from "../axiosInstance";
import baseAxios from 'axios'

export const login = async (email: string, password: string) => {
  return await axios.post("/auth/login", { email, password })
};

export const register = async (email: string, password: string, fullname: string) => {
    return await axios.post(`/auth/register`, {email, password, fullName: fullname})
}
