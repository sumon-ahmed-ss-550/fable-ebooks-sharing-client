import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LayoutContentClient } from "./LayoutContentClient";

export async function LayoutContent({ mode = "desktop" }) {
  // users session
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  // reader nav items
  const readerNavItems = [
    {
      iconName: "ClockArrowRotateLeft",
      label: "Purchase History",
      href: "/dashboard/reader",
    },
    {
      iconName: "BookOpen",
      label: "Purchased Ebooks",
      href: "/dashboard/reader/purchaseEbook",
    },
    {
      iconName: "Person",
      label: "Profile Management",
      href: "/dashboard/reader/purchaseEbook/bookmark/profile",
    },
    {
      iconName: "Bookmark",
      label: "Bookmark Page",
      href: "/dashboard/reader/purchaseEbook/bookmark",
    },
  ];

  // writer nav items
  const writerNavItems = [
    { iconName: "BookOpen", label: "Manage Ebooks", href: "/dashboard/writer" },
    {
      iconName: "LuBookPlus",
      label: "Add Ebook",
      href: "/dashboard/writer/edit_ebook/add_ebook",
    },
    { iconName: "Bookmark", label: "Bookmark Page", href: "/dashboard/writer/bookmarks" },
    { iconName: "ChartBar", label: "Sales History", href: "/dashboard/writer/sales" },
  ];

  // admin nav items
  const adminNavItems = [
    { iconName: "House", label: "Home", href: "/dashboard/admin" },
    {
      iconName: "Person",
      label: "Manage Users",
      href: "/dashboard/admin/transaction/users",
    },
    {
      iconName: "BookOpen",
      label: "Manage All Ebooks",
      href: "/dashboard/admin/transaction/users/ebook",
    },
    {
      iconName: "CreditCard",
      label: "View All Transactions",
      href: "/dashboard/admin/transaction",
    },
  ];

  // selected dashboard content
  const dashboardContentSelected = {
    reader: readerNavItems,
    writer: writerNavItems,
    admin: adminNavItems,
  };
  const navItems = dashboardContentSelected[user?.role];

  return <LayoutContentClient navItems={navItems} mode={mode} />;
}
