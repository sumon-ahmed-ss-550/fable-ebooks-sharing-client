"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSessionStatus } from "@/lib/queries/queries";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!sessionId) {
      router.push("/");
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await getSessionStatus(sessionId);
        if (response?.status === "paid") {
          setStatus("success");
          setTimeout(() => {
            router.push("/dashboard/user");
          }, 3000);
        } else {
          setStatus("pending");
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        setStatus("error");
      }
    };

    checkPaymentStatus();
  }, [sessionId, router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {status === "loading" && (
          <div className="text-slate-100">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-400 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Payment...</h2>
            <p className="text-slate-400">Please wait while we confirm your payment.</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-slate-100">
            <div className="w-16 h-16 bg-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-slate-950"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-slate-400 mb-6">
              Your payment has been confirmed. Redirecting to your dashboard...
            </p>
          </div>
        )}

        {status === "pending" && (
          <div className="text-slate-100">
            <h2 className="text-xl font-semibold mb-2">Payment Pending</h2>
            <p className="text-slate-400 mb-4">
              Your payment is being processed. Please check back later.
            </p>
            <button
              onClick={() => router.push("/dashboard/user")}
              className="px-6 py-2 bg-amber-400 text-slate-950 rounded-lg font-semibold hover:bg-amber-300 transition"
            >
              Go to Dashboard
            </button>
          </div>
        )}

        {status === "error" && (
          <div className="text-slate-100">
            <h2 className="text-xl font-semibold mb-2">Payment Error</h2>
            <p className="text-slate-400 mb-4">
              There was an error verifying your payment. Please contact support.
            </p>
            <button
              onClick={() => router.push("/dashboard/user")}
              className="px-6 py-2 bg-amber-400 text-slate-950 rounded-lg font-semibold hover:bg-amber-300 transition"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
