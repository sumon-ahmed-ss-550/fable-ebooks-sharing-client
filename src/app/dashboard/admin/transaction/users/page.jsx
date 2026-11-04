"use client";

import { useState, useEffect } from "react";
import { getAdminUsers } from "@/lib/queries/queries";
import AdminUsersTable from "@/components/admin/AdminUsersTable";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAdminUsers();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading users...</p>
        </div>
      ) : (
        <AdminUsersTable initialUsers={users} />
      )}
    </div>
  );
};

export default AdminUsersPage;
