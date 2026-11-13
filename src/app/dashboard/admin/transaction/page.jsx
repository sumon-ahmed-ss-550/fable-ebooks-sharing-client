"use client";

import { useState, useEffect } from "react";
import { getAdminTransactions } from "@/lib/queries/queries";
import AdminTransactionsTable from "@/components/admin/AdminTransactionsTable";
import GlobalLoadingSpinner from "@/components/GlobalLoadingSpinner";
import { TableRowSkeleton } from "@/components/LoadingSkeleton";

const AdminTransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getAdminTransactions();
        setTransactions(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]);
      }
      setIsLoading(false);
    };

    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="space-y-4">
          <div className="text-center py-12">
            <GlobalLoadingSpinner size="lg" />
            <p className="mt-4 text-slate-400">Loading transactions...</p>
          </div>
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/60">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Amount</th>
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
        <AdminTransactionsTable initialTransactions={transactions} />
      )}
    </div>
  );
};

export default AdminTransactionPage;
