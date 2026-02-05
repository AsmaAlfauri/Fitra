"use client";
import { logout } from "@/redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h2 className="text-lg font-semibold">Welcome, {user?.name}</h2>
      <button
        onClick={() => dispatch(logout())}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
