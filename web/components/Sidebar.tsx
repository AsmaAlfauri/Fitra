'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const { user } = useSelector((state: RootState) => state.auth);

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Campaigns", href: "/campaigns" },
<<<<<<< HEAD
    { label: "Users", href: "/admin/users", roles: ["admin"] },
=======
    { label: "Users", href: "/admin/users", roles: ["admin"] }, // Admin only
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 btn-secondary"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface-light dark:bg-surface-dark p-4 z-50 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
<<<<<<< HEAD
        <nav className="flex flex-col gap-4 mt-4 md:mt-6">
          {links.map((link) => {
            if (link.roles && !link.roles.includes(user?.role)) return null;
            
            const isActive = pathname === link.href;
=======
        <nav className="flex flex-col gap-4 mt-20 md:mt-0">
          {links.map((link) => {
            // تحقق من الدور
            if (link.roles && !link.roles.includes(user?.role)) return null;
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365

            return (
              <Link
                key={link.href}
                href={link.href}
<<<<<<< HEAD
                onClick={() => setOpen(false)}
                className={`sidebar-link ${isActive ? "sidebar-link-active" : ""}`}
=======
                className={`block px-3 py-2 rounded-lg cursor-pointer transition
                  ${
                    pathname === link.href
                      ? "font-bold bg-amber-300 dark:bg-gray-700 text-white"
                      : "font-semibold dark:text-white hover:bg-amber-200 dark:hover:bg-gray-700"
                  }
                `}
>>>>>>> 85c33702cd1cb9a7d2ba06ddbfdc748d4422a365
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
