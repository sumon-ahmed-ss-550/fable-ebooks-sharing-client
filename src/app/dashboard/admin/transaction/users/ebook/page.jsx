"use client";

import { useState, useEffect } from "react";
import { getAdminAllEbooks } from "@/lib/queries/queries";
import AdminEbooksTable from "@/components/admin/AdminEbooksTable";

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
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading ebooks...</p>
        </div>
      ) : (
        <AdminEbooksTable initialEbooks={ebooks} />
      )}
    </div>
  );
};

export default AdminEbookPage;
