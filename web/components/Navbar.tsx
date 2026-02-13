'use client';

import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/slices/authSlice';

export default function Navbar() {
  const { dark, toggleTheme } = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer hover:opacity-90 transition"
          onClick={() => router.push('/dashboard')}
        >
          FITRA Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="btn-secondary"
          >
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button
            onClick={() => router.push('/profile')}
            className="btn-secondary"
          >
            Profile
          </button>

          <button
            onClick={() => {
              dispatch(logout());
              router.push('/');
            }}
            className="btn-danger"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
