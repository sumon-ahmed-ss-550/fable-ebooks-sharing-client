"use client";

import {
  Bookmark,
  BookOpen,
  ChartBar,
  ClockArrowRotateLeft,
  CreditCard,
  House,
  Person,
} from "@gravity-ui/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuBookPlus } from "react-icons/lu";

const iconMap = {
  ClockArrowRotateLeft,
  BookOpen,
  Person,
  Bookmark,
  LuBookPlus,
  ChartBar,
  House,
  CreditCard,
};

export function DashboardNavLinks({ navItems }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {navItems?.map((item) => {
        const isActive = pathname === item.href;
        const Icon = iconMap[item.iconName];
        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
            }`}
            type="button"
          >
            {Icon && <Icon className={`size-5 ${isActive ? "text-white" : "text-slate-500"}`} />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
