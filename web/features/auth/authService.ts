import axiosInstance from "../../services/axiosConfig";

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const signup = async (data: SignupData) => {
  const res = await axiosInstance.post("/auth/signup", data);
  return res.data;
};

export const login = async (data: LoginData) => {
  const res = await axiosInstance.post("/auth/login", data);
  return res.data;
};
