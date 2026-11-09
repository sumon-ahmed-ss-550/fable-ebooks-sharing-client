"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { exchangeToken } from "@/lib/auth-backend";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session after OAuth callback
        const session = await authClient.getSession();

        if (session?.data) {
          // Exchange token
          const tokenResponse = await exchangeToken(session.data);

          if (!tokenResponse?.token) {
            console.error("Token exchange failed");
            router.push("/signIn");
            return;
          }

          // Redirect based on role
          const user = session.data.user;
          const selectedPath = {
            reader: "/",
            writer: "/dashboard/writer",
            admin: "/dashboard/admin",
          };

          const targetPath = selectedPath[user?.role] || "/";
          router.push(targetPath);
        } else {
          router.push("/signIn");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.push("/signIn");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-slate-600 dark:text-slate-400">Completing sign in...</p>
      </div>
    </div>
  );
}
