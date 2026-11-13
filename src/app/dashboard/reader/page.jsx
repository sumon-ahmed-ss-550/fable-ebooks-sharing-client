"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getReaderPurchases } from "@/lib/queries/queries";
import PurchaseHistoryTable from "@/components/reader/PurchaseHistoryTable";
import GlobalLoadingSpinner from "@/components/GlobalLoadingSpinner";
import { TableRowSkeleton } from "@/components/LoadingSkeleton";

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
        <div className="space-y-4">
          <div className="text-center py-12">
            <GlobalLoadingSpinner size="lg" />
            <p className="mt-4 text-slate-400">Loading purchases...</p>
          </div>
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/60">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Ebook</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <PurchaseHistoryTable purchases={purchases} />
      )}
    </div>
  );
};

export default ReaderPurchaseHistoryPage;
