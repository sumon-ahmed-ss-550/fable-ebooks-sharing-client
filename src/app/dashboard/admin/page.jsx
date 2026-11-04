"use client";

import { useState, useEffect } from "react";
import { getAdminStats } from "@/lib/queries/queries";
import AdminOverview from "@/components/admin/AdminOverview";

const AdminHomePage = () => {
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data || {});
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
        setStats({});
      }
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <AdminOverview stats={stats} isLoading={isLoading} />
    </div>
  );
};

export default AdminHomePage;
