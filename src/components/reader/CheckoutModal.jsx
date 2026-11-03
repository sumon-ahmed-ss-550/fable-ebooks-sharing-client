"use client";

import React, { useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import { CreditCard, CircleCheckFill, CircleExclamation, ShieldCheck, Lock } from "@gravity-ui/icons";
import Image from "next/image";
import { readerMakePurchase } from "@/lib/action/action";
import { useRouter } from "next/navigation";

export default function CheckoutModal({ ebook, user, onPurchaseSuccess, onCancel }) {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("Card");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [transaction, setTransaction] = useState(null);

  const handleConfirmPurchase = async () => {
    setIsLoading(true);
    setErrorMsg("");

    try {
      const payload = {
        readerId: user?.id,
        readerName: user?.name || "Fable Reader",
        readerEmail: user?.email,
        ebookId: ebook._id,
        paymentMethod: paymentMethod === "Card" ? "Credit / Debit Card" : paymentMethod === "MFS" ? "bKash / Nagad / Rocket" : "Digital Wallet",
      };

      const res = await readerMakePurchase(payload);

      if (res?.purchase) {
        setTransaction(res.purchase);
        setIsSuccess(true);
        router.refresh();
        onPurchaseSuccess?.(res.purchase);
      }
    } catch (err) {
      setErrorMsg(err.message || "Failed to complete transaction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <Card className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100">
        {!isSuccess ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif text-slate-50">Confirm Checkout</h2>
                  <p className="text-xs text-slate-400">Complete your digital ebook order</p>
                </div>
              </div>
              {onCancel && (
                <button
                  onClick={onCancel}
                  className="text-slate-400 hover:text-slate-200 text-sm font-semibold p-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
                <CircleExclamation className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Book Overview Card */}
            <div className="flex gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 items-center">
              <div className="relative w-16 h-22 shrink-0 rounded-lg overflow-hidden border border-slate-800 bg-slate-900">
                {ebook.coverImage && (
                  <Image
                    src={ebook.coverImage}
                    alt={ebook.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Chip size="sm" variant="flat" className="bg-amber-400/10 text-amber-300 text-[10px] mb-1 font-semibold uppercase">
                  {ebook.genre}
                </Chip>
                <h3 className="font-bold text-base text-slate-100 truncate">{ebook.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Instant Digital Delivery</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block uppercase">Price</span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  ${Number(ebook.price || 0).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "Card", label: "Credit / Debit Card", sub: "Visa, Mastercard" },
                  { id: "MFS", label: "Mobile Banking", sub: "bKash, Nagad" },
                  { id: "Wallet", label: "Fable Wallet", sub: "Balance" },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === method.id
                        ? "border-amber-400 bg-amber-400/10 text-amber-300 shadow-sm"
                        : "border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="font-bold text-xs">{method.label}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">{method.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Buyer Info */}
            <div className="text-xs text-slate-400 p-3 bg-slate-950/40 rounded-xl border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-slate-500">Purchasing as: </span>
                <strong className="text-slate-200">{user?.name}</strong> ({user?.email})
              </div>
              <div className="flex items-center gap-1 text-emerald-400 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL Encrypted</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              {onCancel && (
                <Button
                  variant="flat"
                  onPress={onCancel}
                  className="w-1/3 bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold cursor-pointer"
                >
                  Cancel
                </Button>
              )}
              <Button
                color="warning"
                variant="solid"
                isLoading={isLoading}
                onPress={handleConfirmPurchase}
                className={`font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 cursor-pointer shadow-lg shadow-amber-400/20 ${onCancel ? "w-2/3" : "w-full"}`}
              >
                Pay ${Number(ebook.price || 0).toFixed(2)} & Read Now
              </Button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
              <CircleCheckFill className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-serif text-slate-50">Purchase Successful!</h2>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                Thank you! <strong>{ebook.title}</strong> has been added to your digital bookshelf.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-left space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction ID:</span>
                <span className="text-amber-400 font-semibold">{transaction?.transactionId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount Paid:</span>
                <span className="text-slate-200">${Number(ebook.price || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Status:</span>
                <span className="text-emerald-400 font-semibold uppercase">{transaction?.status}</span>
              </div>
            </div>

            <Button
              color="primary"
              variant="solid"
              onPress={() => {
                if (onCancel) onCancel();
                router.push("/dashboard/reader/purchaseEbook");
              }}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold cursor-pointer"
            >
              Go to My Ebooks
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

