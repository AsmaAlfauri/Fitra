import api from "./api";

export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  role?: "viewer" | "admin";
}

export const login = async (data: LoginPayload) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const signup = async (data: SignupPayload) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};