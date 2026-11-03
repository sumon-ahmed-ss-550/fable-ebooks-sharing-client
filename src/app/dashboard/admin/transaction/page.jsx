import { getAdminTransactions } from "@/lib/queries/queries";
import AdminTransactionsTable from "@/components/admin/AdminTransactionsTable";

const AdminTransactionPage = async () => {
  const transactions = await getAdminTransactions();

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <AdminTransactionsTable
        initialTransactions={Array.isArray(transactions) ? transactions : []}
      />
    </div>
  );
};

export default AdminTransactionPage;
