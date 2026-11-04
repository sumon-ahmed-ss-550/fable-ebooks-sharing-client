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
    <nav className="flex flex-col gap-1">
      {navItems?.map((item) => {
        const isActive = pathname === item.href;
        const Icon = iconMap[item.iconName];
        return (
          <Link
            href={item.href}
            key={item.label}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              isActive
                ? "bg-indigo-600 text-white font-medium shadow-md"
                : "text-foreground hover:bg-default"
            }`}
            type="button"
          >
            {Icon && <Icon className={`size-5 ${isActive ? "text-white" : "text-muted"}`} />}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
