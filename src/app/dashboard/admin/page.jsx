import { getAdminStats } from "@/lib/queries/queries";
import AdminOverview from "@/components/admin/AdminOverview";

const AdminHomePage = async () => {
  const stats = await getAdminStats();

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <AdminOverview stats={stats || {}} />
    </div>
  );
};

export default AdminHomePage;
