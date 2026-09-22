"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Button, Input } from "@heroui/react";

// Gravity UI Icons (Direct Imports)
import {
  BookOpen,
  PaperPlane,
  LogoTelegram,
  LogoGithub,
  Check,
} from "@gravity-ui/icons";
import { FiTwitter, FiYoutube } from "react-icons/fi";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Browse Ebooks", path: "/browse" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  const socialLinks = [
    { name: "Twitter / X", icon: FiTwitter, href: "#" },
    { name: "GitHub", icon: LogoGithub, href: "#" },
    { name: "Telegram", icon: LogoTelegram, href: "#" },
    { name: "YouTube", icon: FiYoutube, href: "#" },
  ];

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md group-hover:bg-indigo-700 transition-colors">
                <BookOpen width={20} height={20} />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Fable
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Democratizing access to literature. Read, share, and publish
              original ebooks seamlessly on a modern global platform.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600 text-slate-400 hover:text-white transition-all duration-200"
                  >
                    <IconComponent width={18} height={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup Placeholder (Frontend Only) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Stay Updated
            </h3>
            <p className="text-sm text-slate-400">
              Subscribe to our newsletter to receive updates on newly published
              ebooks and top-trending writers.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  variant="bordered"
                  size="md"
                  className={{
                    inputWrapper:
                      "bg-slate-800/60 border-slate-700 hover:border-slate-600 focus-within:border-indigo-500! text-white",
                    input: "text-white placeholder:text-slate-500 text-sm",
                  }}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="solid"
                  size="md"
                  startContent={
                    subscribed ? (
                      <Check width={18} height={18} />
                    ) : (
                      <PaperPlane width={18} height={18} />
                    )
                  }
                  className="bg-indigo-600 text-white hover:bg-indigo-700 font-medium whitespace-nowrap"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </Button>
              </div>

              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-emerald-400 font-medium"
                >
                  Thank you for subscribing to Fable updates!
                </motion.p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Fable Platform. All rights reserved.
          </p>
          <p className="text-slate-500">Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
