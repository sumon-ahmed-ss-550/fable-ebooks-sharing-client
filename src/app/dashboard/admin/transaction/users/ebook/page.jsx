"use client";

import { useState, useEffect } from "react";
import { getAdminAllEbooks } from "@/lib/queries/queries";
import AdminEbooksTable from "@/components/admin/AdminEbooksTable";
import GlobalLoadingSpinner from "@/components/GlobalLoadingSpinner";
import { TableRowSkeleton } from "@/components/LoadingSkeleton";

const AdminEbookPage = () => {
  const [ebooks, setEbooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEbooks = async () => {
      try {
        const data = await getAdminAllEbooks();
        setEbooks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch ebooks:", error);
        setEbooks([]);
      }
      setIsLoading(false);
    };

    fetchEbooks();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="space-y-4">
          <div className="text-center py-12">
            <GlobalLoadingSpinner size="lg" />
            <p className="mt-4 text-slate-400">Loading ebooks...</p>
          </div>
          <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/60">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Genre</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-300 uppercase tracking-wider">Actions</th>
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
        <AdminEbooksTable initialEbooks={ebooks} />
      )}
    </div>
  );
};

export default AdminEbookPage;
