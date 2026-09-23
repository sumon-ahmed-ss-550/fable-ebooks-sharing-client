"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Card, Button, Input, Checkbox } from "@heroui/react";

// Gravity UI Icons
import {
  BookOpen,
  Eye,
  EyeSlash,
  ArrowRight,
  Sparkles,
  Pencil,
  Check,
  CircleExclamation,
} from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  // Form State
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("reader");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // UI State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleNextStep = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (!agreeToTerms) {
      setErrorMessage("Please accept the terms and conditions to proceed.");
      return;
    }

    setStep(2);
  };

  // handle complete registration
  const handleCompleteRegistration = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        role: selectedRole,
        agreeToTerms,
      });
      await authClient.signOut();

      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Registration complete state (No JWT token storage, no redirection)
      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage(
        "Email is already registered. Please try another or sign in.",
      );
      setStep(1);
    } finally {
      setIsLoading(false);
    }
  };

  // handle google signUp
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
      });

      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitted(true);
    } catch (err) {
      setErrorMessage("Failed to authenticate with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Ambient Decorative Blurs */}
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
              {isSubmitted
                ? "Account Created"
                : step === 1
                  ? "Get Started with Fable"
                  : "Step 2 of 2"}
            </div>

            <Card.Title className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isSubmitted
                ? "Registration Complete"
                : step === 1
                  ? "Create Your Account"
                  : "Choose Your Account Type"}
            </Card.Title>

            <Card.Description className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              {isSubmitted
                ? "Your account has been successfully set up."
                : step === 1
                  ? "Join Fable to read, write, and explore thousands of stories."
                  : "Select how you'd like to use Fable. You can customize this later."}
            </Card.Description>
          </Card.Header>

          {/* Content */}
          <Card.Content className="space-y-5 pt-4 w-full">
            {/* Error Display Banner */}
            {errorMessage && (
              <div className="p-3 text-xs flex items-center gap-2 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400">
                <CircleExclamation
                  width={16}
                  height={16}
                  className="shrink-0"
                />
                <span>{errorMessage}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* SUCCESS STATE (No redirect) */
                <motion.div
                  key="submitted"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-center py-6 space-y-4 w-full"
                >
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check width={32} height={32} />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    Thank you for signing up as a{" "}
                    <strong className="capitalize text-indigo-600 dark:text-indigo-400">
                      {selectedRole}
                    </strong>
                    !
                  </p>
                </motion.div>
              ) : step === 1 ? (
                /* STEP 1: Registration Credentials Form */
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5 w-full"
                >
                  {/* Google OAuth */}
                  <Button
                    type="button"
                    variant="bordered"
                    size="lg"
                    onClick={handleGoogleSignUp}
                    isLoading={isLoading}
                    className="w-full font-medium border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    {!isLoading && <FcGoogle width={18} height={18} />}
                    <span>Sign up with Google</span>
                  </Button>

                  {/* Divider */}
                  <div className="relative flex items-center justify-center my-2 w-full">
                    <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                    <span className="absolute px-3 bg-white dark:bg-slate-900 text-xs text-slate-400 uppercase tracking-wider font-medium">
                      Or with email
                    </span>
                  </div>

                  <form onSubmit={handleNextStep} className="space-y-4 w-full">
                    {/* Full Name */}
                    <div className="space-y-1.5 w-full">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        variant="bordered"
                        size="lg"
                        className="w-full text-slate-900 dark:text-white"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5 w-full">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
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

                    {/* Password */}
                    <div className="space-y-1.5 w-full">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <div className="relative flex items-center w-full">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="At least 8 characters"
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

                    {/* Confirm Password */}
                    <div className="space-y-1.5 w-full">
                      <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Confirm Password
                      </label>
                      <div className="relative flex items-center w-full">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          variant="bordered"
                          size="lg"
                          className="w-full pr-10 text-slate-900 dark:text-white"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3.5 focus:outline-none text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors z-10"
                        >
                          {showConfirmPassword ? (
                            <EyeSlash width={18} height={18} />
                          ) : (
                            <Eye width={18} height={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* HeroUI Checkbox */}
                    <div className="pt-2">
                      <Checkbox
                        isSelected={agreeToTerms}
                        onChange={(e) =>
                          setAgreeToTerms(
                            typeof e === "boolean"
                              ? e
                              : (e?.target?.checked ?? !agreeToTerms),
                          )
                        }
                      >
                        <Checkbox.Content className="flex items-center gap-2 cursor-pointer">
                          <Checkbox.Control>
                            <Checkbox.Indicator />
                          </Checkbox.Control>
                          <span className="text-xs text-slate-600 dark:text-slate-400 leading-tight">
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                              Privacy Policy
                            </Link>
                          </span>
                        </Checkbox.Content>
                      </Checkbox>
                    </div>

                    {/* Next Button */}
                    <Button
                      type="submit"
                      color="primary"
                      variant="solid"
                      size="lg"
                      className="w-full mt-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
                    >
                      <span>Continue to Role Selection</span>
                      <ArrowRight width={18} height={18} />
                    </Button>
                  </form>
                </motion.div>
              ) : (
                /* STEP 2: Role Selection (Reader vs Writer) */
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 w-full"
                >
                  <div className="grid grid-cols-1 gap-3 w-full">
                    {/* User / Reader Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedRole("reader")}
                      className={`p-4 rounded-2xl border text-left transition-all relative flex items-start gap-3.5 ${
                        selectedRole === "reader"
                          ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                        <BookOpen width={20} height={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                            Reader / User
                          </h4>
                          {selectedRole === "reader" && (
                            <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                              <Check width={12} height={12} />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Discover books, bookmark your favorite stories, write
                          reviews, and build your digital shelf.
                        </p>
                      </div>
                    </button>

                    {/* Writer Option */}
                    <button
                      type="button"
                      onClick={() => setSelectedRole("writer")}
                      className={`p-4 rounded-2xl border text-left transition-all relative flex items-start gap-3.5 ${
                        selectedRole === "writer"
                          ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20"
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                        <Pencil width={20} height={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                            Writer / Author
                          </h4>
                          {selectedRole === "writer" && (
                            <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                              <Check width={12} height={12} />
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Publish web novels & ebooks, manage chapters, build an
                          audience, and monetize your creative writing.
                        </p>
                      </div>
                    </button>
                  </div>

                  {/* Action Buttons for Step 2 */}
                  <div className="flex items-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="bordered"
                      size="lg"
                      onClick={() => setStep(1)}
                      disabled={isLoading}
                      className="w-1/3 font-medium border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300"
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      color="primary"
                      variant="solid"
                      size="lg"
                      isLoading={isLoading}
                      onClick={handleCompleteRegistration}
                      className="w-2/3 font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2"
                    >
                      <span>Complete Setup</span>
                      {!isLoading && <ArrowRight width={18} height={18} />}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card.Content>

          {/* Footer */}
          <Card.Footer className="flex justify-center text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-800/60 mt-4 w-full">
            <span>
              Already have an account?{" "}
              <Link
                href="/signIn"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Sign in
              </Link>
            </span>
          </Card.Footer>
        </Card>
      </motion.div>
    </main>
  );
}
