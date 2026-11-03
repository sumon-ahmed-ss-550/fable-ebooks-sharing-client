import { getAdminAllEbooks } from "@/lib/queries/queries";
import AdminEbooksTable from "@/components/admin/AdminEbooksTable";

const AdminEbookPage = async () => {
  const ebooks = await getAdminAllEbooks();

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <AdminEbooksTable initialEbooks={Array.isArray(ebooks) ? ebooks : []} />
    </div>
  );
};

export default AdminEbookPage;
