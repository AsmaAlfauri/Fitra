'use client';
import { useTheme } from '@/context/ThemeContext';

export default function Footer() {
  const { dark } = useTheme();
  return (
    <footer
      className="w-full p-4 bg-amber-600 dark:bg-gray-800 text-white text-center"
    >
      &copy; 2026 FITRA Charity Dashboard. Done By Asma Alfauri. All rights reserved.
    </footer>
  );
}
