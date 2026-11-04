"use client";

import { useState, useEffect } from "react";
import { getAdminTransactions } from "@/lib/queries/queries";
import AdminTransactionsTable from "@/components/admin/AdminTransactionsTable";

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
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading transactions...</p>
        </div>
      ) : (
        <AdminTransactionsTable initialTransactions={transactions} />
      )}
    </div>
  );
};

export default AdminTransactionPage;
