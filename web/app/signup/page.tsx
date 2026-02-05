"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupThunk, reset } from "@/redux/slices/signupSlice";
import { AppDispatch, RootState } from "@/redux/store";

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success } = useSelector((state: RootState) => state.signup);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "viewer",
  });

  useEffect(() => {
    dispatch(reset()); // reset state on mount
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupThunk(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">Signup successful! ✅</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="mb-4 w-full p-2 border rounded"
        />

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

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="mb-4 w-full p-2 border rounded"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
}
