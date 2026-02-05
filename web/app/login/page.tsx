"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, hydrate } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(hydrate()); // load token/user from localStorage
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {user && <p className="text-green-500 mb-4">Logged in as {user.name} ✅</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-4 w-full p-2 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-4 w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          type="button"
          onClick={() =>
            dispatch(
              loginThunk({ email: "viewerUser1@g.com", password: "12345" })
            )
          }
          className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
        >
          Login as Guest
        </button>
      </form>
    </div>
  );
}
