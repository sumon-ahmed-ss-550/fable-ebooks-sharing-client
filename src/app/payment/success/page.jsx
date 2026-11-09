"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getSessionStatus } from "@/lib/queries/queries";
import { authClient } from "@/lib/auth-client";

export default function PaymentSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!sessionId) {
      router.push("/browse");
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await getSessionStatus(sessionId);
        console.log("Payment status response:", response);

        if (response?.status === "paid" || response?.transaction?.status === "completed") {
          setStatus("success");

          // Create purchase record if transaction is completed but no purchase exists
          if (response?.transaction && response.transaction.transactionType === "ebook_purchase") {
            try {
              const session = await authClient.getSession();
              const user = session?.user;

              console.log("User session:", user);

              if (user) {
                // Get JWT token from localStorage
                const token = localStorage.getItem("jwt_token");
                console.log("JWT token:", token ? "exists" : "not found");

                const purchaseData = {
                  readerId: user.id,
                  readerName: user.name || "Reader",
                  readerEmail: user.email || "",
                  ebookId: response.transaction.ebookId,
                  paymentMethod: "Stripe",
                };

                console.log("Creating purchase with data:", purchaseData);

                // Create purchase record
                const purchaseResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/reader/purchase`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                  },
                  body: JSON.stringify(purchaseData),
                });

                const purchaseResult = await purchaseResponse.json();
                console.log("Purchase creation response:", purchaseResult);
                console.log("Purchase response status:", purchaseResponse.status);
              } else {
                console.error("No user session found");
              }
            } catch (error) {
              console.error("Error creating purchase record:", error);
            }
          } else {
            console.log("Transaction not ebook_purchase or no transaction found");
          }

          setTimeout(() => {
            router.push("/dashboard/reader/purchaseEbook");
          }, 3000);
        } else {
          console.log("Payment not completed yet, status:", response?.status);
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
              Your payment has been confirmed. Redirecting to your library...
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
              onClick={() => router.push("/dashboard/reader/purchaseEbook")}
              className="px-6 py-2 bg-amber-400 text-slate-950 rounded-lg font-semibold hover:bg-amber-300 transition"
            >
              Go to My Library
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
              onClick={() => router.push("/dashboard/reader/purchaseEbook")}
              className="px-6 py-2 bg-amber-400 text-slate-950 rounded-lg font-semibold hover:bg-amber-300 transition"
            >
              Go to My Library
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
