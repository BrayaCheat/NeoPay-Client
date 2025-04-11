import axios from "../axiosInstance";

export const login = async (email: string, password: string) => {
  return await axios
    .post("/auth/login", { email, password })
    .then((res) => res.data);
};
