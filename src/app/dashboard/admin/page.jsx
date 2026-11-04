import { getAdminStats } from "@/lib/queries/queries";
import AdminOverview from "@/components/admin/AdminOverview";

const AdminHomePage = async () => {
  let stats = null;
  let isLoading = false;

  try {
    stats = await getAdminStats();
  } catch (err) {
    isLoading = true;
    stats = {};
  }

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <AdminOverview stats={stats || {}} isLoading={isLoading} />
    </div>
  );
};

export default AdminHomePage;
