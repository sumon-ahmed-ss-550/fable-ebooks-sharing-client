import { auth } from "@/lib/auth";
import { getReaderPurchases } from "@/lib/queries/queries";
import { headers } from "next/headers";
import PurchaseHistoryTable from "@/components/reader/PurchaseHistoryTable";

const ReaderPurchaseHistoryPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const purchases = user?.id ? await getReaderPurchases(user.id) : [];

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <PurchaseHistoryTable
        purchases={Array.isArray(purchases) ? purchases : []}
      />
    </div>
  );
};

export default ReaderPurchaseHistoryPage;
