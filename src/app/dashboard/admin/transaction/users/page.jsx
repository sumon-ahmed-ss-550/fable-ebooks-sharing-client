import { getAdminUsers } from "@/lib/queries/queries";
import AdminUsersTable from "@/components/admin/AdminUsersTable";

const AdminUsersPage = async () => {
  const users = await getAdminUsers();

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <AdminUsersTable initialUsers={Array.isArray(users) ? users : []} />
    </div>
  );
};

export default AdminUsersPage;
