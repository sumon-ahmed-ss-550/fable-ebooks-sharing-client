"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Card, Button, Input, Checkbox } from "@heroui/react";

// Gravity UI Icons
import {
  BookOpen,
  Eye,
  EyeSlash,
  ArrowRight,
  Sparkles,
} from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (data) {
      router.push("/");
    }

    // Submit logic here
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Dynamic Ambient Blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 sm:p-6 shadow-2xl border border-slate-200/80 dark:border-slate-800 rounded-3xl w-full">
          {/* Header */}
          <Card.Header className="flex flex-col items-center text-center space-y-3 pb-2 w-full">
            <Link
              href="/"
              className="inline-flex items-center gap-2 group mb-1"
            >
              <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
                <BookOpen width={24} height={24} />
              </div>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/50 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <Sparkles width={14} height={14} />
              Welcome Back
            </div>

            <Card.Title className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sign in to Fable
            </Card.Title>

            <Card.Description className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              Access your digital library, saved ebooks, and reading history.
            </Card.Description>
          </Card.Header>

          {/* Content */}
          <Card.Content className="space-y-6 pt-4 w-full">
            {/* Social Sign In */}
            <Button
              type="button"
              variant="bordered"
              size="lg"
              className="w-full font-medium border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <FcGoogle width={18} height={18} />
              <span>Continue with Google</span>
            </Button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2 w-full">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
              <span className="absolute px-3 bg-white dark:bg-slate-900 text-xs text-slate-400 uppercase tracking-wider font-medium">
                Or with email
              </span>
            </div>

            {/* Email / Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              {/* Email Input Field */}
              <div className="space-y-1.5 w-full">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <div className="w-full">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="bordered"
                    size="lg"
                    className="w-full text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Password Input Field */}
              <div className="space-y-1.5 w-full">
                <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative flex items-center w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    variant="bordered"
                    size="lg"
                    className="w-full pr-10 text-slate-900 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 focus:outline-none text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
                  >
                    {showPassword ? (
                      <EyeSlash width={18} height={18} />
                    ) : (
                      <Eye width={18} height={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between text-xs sm:text-sm pt-1 w-full">
                <Checkbox
                  isSelected={rememberMe}
                  onValueChange={setRememberMe}
                  size="sm"
                  color="primary"
                >
                  <span className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
                    Remember me
                  </span>
                </Checkbox>
                <Link
                  href="/forgot-password"
                  className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                color="primary"
                variant="solid"
                size="lg"
                isLoading={isLoading}
                className="w-full mt-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
                {!isLoading && <ArrowRight width={18} height={18} />}
              </Button>
            </form>
          </Card.Content>

          {/* Footer */}
          <Card.Footer className="flex justify-center text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-4 w-full">
            <span>
              Do not have an account?{" "}
              <Link
                href="/signUp"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Create an account
              </Link>
            </span>
          </Card.Footer>
        </Card>
      </motion.div>
    </main>
  );
}
