"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getReaderPurchases } from "@/lib/queries/queries";
import PurchaseHistoryTable from "@/components/reader/PurchaseHistoryTable";

const ReaderPurchaseHistoryPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [purchases, setPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (user?.id) {
        try {
          const data = await getReaderPurchases(user.id);
          setPurchases(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch purchases:", error);
          setPurchases([]);
        }
      }
      setIsLoading(false);
    };

    fetchPurchases();
  }, [user?.id]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading purchases...</p>
        </div>
      ) : (
        <PurchaseHistoryTable purchases={purchases} />
      )}
    </div>
  );
};

export default ReaderPurchaseHistoryPage;
