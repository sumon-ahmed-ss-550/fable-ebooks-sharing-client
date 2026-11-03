import { auth } from "@/lib/auth";
import { getOneEbook, getReaderPurchasedEbooks } from "@/lib/queries/queries";
import { headers } from "next/headers";
import PurchasedEbooksList from "@/components/reader/PurchasedEbooksList";

const ReaderPurchaseEbookPage = async ({ searchParams }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const resolvedParams = await searchParams;
  const pendingEbookId = resolvedParams?.ebookId;

  const [purchasedBooks, pendingEbook] = await Promise.all([
    user?.id ? getReaderPurchasedEbooks(user.id) : [],
    pendingEbookId ? getOneEbook(pendingEbookId) : null,
  ]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <PurchasedEbooksList
        books={Array.isArray(purchasedBooks) ? purchasedBooks : []}
        user={user}
        pendingEbook={pendingEbook}
      />
    </div>
  );
};

export default ReaderPurchaseEbookPage;
