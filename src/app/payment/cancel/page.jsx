"use client";

import { useRouter } from "next/navigation";

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Payment Canceled</h2>
        <p className="text-slate-400 mb-6">
          Your payment was canceled. You can try again whenever you're ready.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 border border-slate-700 text-slate-100 rounded-lg font-semibold hover:bg-slate-800 transition"
          >
            Go Back
          </button>
          <button
            onClick={() => router.push("/browse")}
            className="px-6 py-2 bg-amber-400 text-slate-950 rounded-lg font-semibold hover:bg-amber-300 transition"
          >
            Browse Ebooks
          </button>
        </div>
      </div>
    </div>
  );
}
