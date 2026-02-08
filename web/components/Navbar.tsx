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
    <nav className="w-full bg-amber-600 dark:bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push('/dashboard')}
        >
          FITRA Dashboard
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg font-semibold hover:opacity-90 transition"
          >
            {dark ? 'Light Mode' : 'Dark Mode'}
          </button>

          <button
            onClick={() => router.push('/profile')}
            className="px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold hover:opacity-90 transition"
          >
            Profile
          </button>

          <button
            onClick={() => {
              dispatch(logout());
              router.push('/login');
            }}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 font-bold transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
