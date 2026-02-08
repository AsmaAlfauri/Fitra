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

  const links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "Users", href: "/admin/users", roles: ["admin"] }, // Admin only
  ];

  return (
    <>
      {/* Toggle button للـ mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-300 dark:bg-gray-700 rounded shadow"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-amber-100 dark:bg-gray-800 p-4 z-40 transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <nav className="flex flex-col gap-4 mt-20 md:mt-0">
          {links.map((link) => {
            // تحقق من الدور
            if (link.roles && !link.roles.includes(user?.role)) return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg cursor-pointer transition
                  ${
                    pathname === link.href
                      ? "font-bold bg-amber-300 dark:bg-gray-700 text-white"
                      : "font-semibold dark:text-white hover:bg-amber-200 dark:hover:bg-gray-700"
                  }
                `}
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
