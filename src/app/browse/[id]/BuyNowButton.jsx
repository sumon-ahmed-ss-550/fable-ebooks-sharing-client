"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { createEbookCheckoutSession } from "@/lib/queries/queries";
import { toast } from "sonner";
import { getJWTToken, exchangeToken } from "@/lib/auth-backend";
import { authClient } from "@/lib/auth-client";

export default function BuyNowButton({ ebook, user }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNow = async () => {
    if (!user) {
      router.push("/signIn");
      return;
    }

    // Check JWT token
    let token = getJWTToken();
    console.log("JWT Token:", token ? token.substring(0, 20) + "..." : "NOT SET");

    // If no token but user exists, try to exchange token
    if (!token) {
      console.log("No JWT token found, attempting to exchange...");
      try {
        const session = await authClient.getSession();
        if (session?.data) {
          const tokenResponse = await exchangeToken(session.data);
          token = tokenResponse?.token;
          console.log("Token exchange successful:", token ? "YES" : "NO");
        }
      } catch (error) {
        console.error("Token exchange failed:", error);
      }
    }

    if (!token) {
      toast.error("Authentication Error", {
        description: "Please sign in again to continue.",
      });
      router.push("/signIn");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Creating checkout session for:", { userId: user.id, ebookId: ebook._id });
      const response = await createEbookCheckoutSession(user.id, ebook._id);
      console.log("Checkout session response:", response);

      if (response?.url) {
        window.location.href = response.url;
      } else {
        toast.error("Payment Error", {
          description: "Failed to create checkout session. Please try again.",
        });
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      toast.error("Payment Error", {
        description: error.message || "Failed to initiate payment. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <button
        onClick={() => router.push("/signIn")}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-700 px-6 py-3.5 text-sm font-bold text-slate-100 shadow-lg transition hover:bg-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
      >
        Sign In to Purchase
        <span aria-hidden="true">→</span>
      </button>
    );
  }

  return (
    <Button
      isLoading={isLoading}
      onPress={handleBuyNow}
      className="mt-7 w-full font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-lg shadow-amber-400/10"
      size="lg"
    >
      Buy Now
      <span aria-hidden="true">→</span>
    </Button>
  );
}
