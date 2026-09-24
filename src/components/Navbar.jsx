"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@heroui/react";

// Gravity UI Icons imported directly as React components
import {
  Bars,
  Xmark,
  BookOpen,
  ArrowRightToSquare,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // user session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // navigation links
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Ebooks", path: "/browse" },
  ];

  // push dashboard in navLinks
  if (user) {
    const selectedPath = {
      reader: "/dashboard/reader",
      writer: "/dashboard/writer",
      admin: "/dashboard/admin",
    };

    navLinks.push({ name: "Dashboard", path: selectedPath[user?.role] });
  }
  const isActiveRoute = (path) => pathname === path;

  // handle sign out function
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signIn");
        },
      },
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Site Name */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md group-hover:bg-indigo-700 transition-colors">
              <BookOpen width={20} height={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Fable
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActiveRoute(link.path);
              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? null : user ? (
              <Button
                color="danger"
                variant="flat"
                startContent={<ArrowRightFromSquare width={16} height={16} />}
                onClick={handleSignOut}
                className="font-medium"
              >
                Logout
              </Button>
            ) : (
              <Link href="/signIn">
                <Button
                  color="primary"
                  variant="solid"
                  startContent={<ArrowRightToSquare width={16} height={16} />}
                  className="font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <Xmark width={24} height={24} />
              ) : (
                <Bars width={24} height={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const active = isActiveRoute(link.path);
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Auth Buttons */}
              <div className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800">
                {isPending ? null : user ? (
                  <Button
                    color="danger"
                    variant="flat"
                    fullWidth
                    startContent={
                      <ArrowRightFromSquare width={18} height={18} />
                    }
                    onClick={handleSignOut}
                    className="justify-center font-medium"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link href="/signIn">
                    <Button
                      color="primary"
                      variant="solid"
                      fullWidth
                      startContent={
                        <ArrowRightToSquare width={18} height={18} />
                      }
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      className="justify-center font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
