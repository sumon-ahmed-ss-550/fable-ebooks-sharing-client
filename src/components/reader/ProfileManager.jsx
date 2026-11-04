"use client";

import React, { useState } from "react";
import { Card, Button, Input, Chip } from "@heroui/react";
import { Person, CircleCheckFill, CircleExclamation, ShieldCheck } from "@gravity-ui/icons";
import { readerUpdateProfile } from "@/lib/action/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileManager({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || "");
  const [image, setImage] = useState(user?.image || "");
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      await readerUpdateProfile(user?.id, { name, image });
      setStatusMsg({ type: "success", text: "Profile updated successfully!" });
      toast.success("Profile updated successfully!", {
        description: "Your profile changes have been saved.",
      });
      router.refresh();
    } catch (err) {
      setStatusMsg({ type: "error", text: err.message || "Failed to update profile." });
      toast.error("Failed to update profile", {
        description: err.message || "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Person className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Account Settings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-100 tracking-tight">
            Profile Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your personal profile details and account settings.
          </p>
        </div>

        <Chip size="md" variant="flat" className="capitalize bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold self-start sm:self-auto">
          Role: {user?.role || "Reader"}
        </Chip>
      </div>

      {statusMsg.text && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs sm:text-sm ${
            statusMsg.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CircleCheckFill className="w-5 h-5 shrink-0" />
          ) : (
            <CircleExclamation className="w-5 h-5 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Profile Card */}
      <Card className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <form onSubmit={handleUpdate} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Full Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-950 border border-slate-700 text-slate-100 px-4 py-2 text-sm focus:border-amber-400"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Email Address (Read-only)
              </label>
              <Input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full rounded-xl bg-slate-950/50 border border-slate-800 text-slate-500 px-4 py-2 text-sm cursor-not-allowed"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
              Profile Avatar Image URL
            </label>
            <Input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-700 text-slate-100 px-4 py-2 text-sm focus:border-amber-400"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Secured by Fable Auth</span>
            </div>

            <Button
              type="submit"
              color="warning"
              variant="solid"
              isLoading={isLoading}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 cursor-pointer"
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

