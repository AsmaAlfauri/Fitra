import axiosInstance from "../../services/axiosConfig";

export const getAllUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await axiosInstance.delete(`/users/${id}`);
  return res.data;
};
