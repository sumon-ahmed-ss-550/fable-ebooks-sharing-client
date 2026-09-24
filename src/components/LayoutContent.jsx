import { auth } from "@/lib/auth";
import {
  Bars,
  Bookmark,
  BookOpen,
  ChartBar,
  ClockArrowRotateLeft,
  Pencil,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { hr } from "motion/react-client";
import { headers } from "next/headers";
import Link from "next/link";
import { LuBookPlus } from "react-icons/lu";

export async function LayoutContent() {
  // users session
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  // reader nav items
  const readerNavItems = [
    { icon: ClockArrowRotateLeft, label: "Purchase History", href: "#" },
    { icon: BookOpen, label: "Purchased Ebooks", href: "#" },
    { icon: Person, label: "Profile Management", href: "#" },
    { icon: Bookmark, label: "Bookmark Page", href: "#" },
  ];

  // writer nav items
  const writerNavItems = [
    { icon: BookOpen, label: "Manage Ebooks", href: "/dashboard/writer" },
    {
      icon: LuBookPlus,
      label: "Add Ebook",
      href: "/dashboard/writer/edit_ebook/add_ebook",
    },
    { icon: Pencil, label: "Edit Ebook", href: "/dashboard/writer/edit_ebook" },
    { icon: Bookmark, label: "Bookmark Page", href: "#" },
    { icon: ChartBar, label: "Sales History", href: "#" },
  ];

  // admin nav items
  const adminNavItems = [
    { icon: Bookmark, label: "Home", href: "#" },
    { icon: ClockArrowRotateLeft, label: "Manage Users", href: "#" },
    { icon: BookOpen, label: "Manage All Ebooks", href: "#" },
    { icon: Person, label: "View All Transactions", href: "#" },
  ];

  // selected dashboard content
  const dashboardContentSelected = {
    reader: readerNavItems,
    writer: writerNavItems,
    admin: adminNavItems,
  };
  const navItems = dashboardContentSelected[user?.role];

  //   nav links
  const layoutNavLinks = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <Drawer>
      {/* desktop */}
      <aside className="w-64 border-r shrink-0 p-4 hidden lg:block">
        {layoutNavLinks}
      </aside>

      {/* mobile menu button */}
      <Button variant="secondary" className="lg:hidden">
        <Bars />
        Menu
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>{layoutNavLinks}</Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
