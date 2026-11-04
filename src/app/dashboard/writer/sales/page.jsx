"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getWriterSales } from "@/lib/queries/queries";
import { Table, Chip } from "@heroui/react";
import { ChartBar, Receipt, CreditCard } from "@gravity-ui/icons";
import Link from "next/link";

const WriterSalesPage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [salesData, setSalesData] = useState({ sales: [], totalSales: 0, totalEarnings: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      if (user?.id) {
        try {
          const data = await getWriterSales(user.id);
          setSalesData(data || { sales: [], totalSales: 0, totalEarnings: 0 });
        } catch (e) {
          console.error("Failed to fetch sales:", e);
          setSalesData({ sales: [], totalSales: 0, totalEarnings: 0 });
        }
      }
      setIsLoading(false);
    };

    fetchSales();
  }, [user?.id]);

  const { sales = [], totalSales = 0, totalEarnings = 0 } = salesData;

  return (
    <div className="min-h-screen p-4 md:p-8 text-zinc-100 max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181b] p-6 rounded-2xl border border-zinc-800 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold uppercase tracking-wider">
              Royalties & Sales
            </span>
          </div>
          <h1 className="text-2xl font-bold font-serif text-white">
            Author Sales History
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Track revenue and reader purchases for all your published literature.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/writer"
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-700 transition"
          >
            ← Back to Manage Ebooks
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading sales data...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-[#18181b] border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-zinc-400 uppercase tracking-wider block font-semibold">
                  Total Books Sold
                </span>
                <span className="text-3xl font-black text-white font-mono mt-1 block">
                  {totalSales}
                </span>
                <span className="text-xs text-zinc-500 mt-1 block">
                  Direct reader copies purchased
                </span>
              </div>
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
                <ChartBar className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#18181b] border border-zinc-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 uppercase tracking-wider block font-semibold">
                  Total Royalties Earned
                </span>
                <span className="text-3xl font-black text-amber-400 font-mono mt-1 block">
                  ${Number(totalEarnings).toFixed(2)}
                </span>
                <span className="text-xs text-zinc-500 mt-1 block">
                  Gross author payout balance
                </span>
              </div>
              <div className="p-3 bg-amber-400/10 text-amber-400 rounded-xl border border-amber-400/20">
                <CreditCard className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Sales Table */}
          <div className="bg-[#18181b] rounded-2xl border border-zinc-800 shadow-md overflow-hidden p-2">
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Writer Sales Table">
                  <Table.Header>
                    <Table.Column className="text-zinc-400 font-semibold">Ebook Title</Table.Column>
                    <Table.Column className="text-zinc-400 font-semibold">Buyer Name</Table.Column>
                    <Table.Column className="text-zinc-400 font-semibold">Transaction ID</Table.Column>
                    <Table.Column className="text-zinc-400 font-semibold">Price</Table.Column>
                    <Table.Column className="text-zinc-400 font-semibold">Date</Table.Column>
                    <Table.Column className="text-right text-zinc-400 font-semibold">Status</Table.Column>
                  </Table.Header>

                  <Table.Body>
                    {sales.length === 0 ? (
                      <Table.Row>
                        <Table.Cell colSpan={6} className="text-center py-12 text-zinc-500">
                          <div className="flex flex-col items-center gap-2">
                            <Receipt className="w-8 h-8 text-zinc-600" />
                            <p className="text-sm">No sales recorded yet.</p>
                            <p className="text-xs text-zinc-500">
                              Publish more ebooks and share your story with readers!
                            </p>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ) : (
                      sales.map((s) => (
                        <Table.Row
                          key={s._id}
                          className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition-colors"
                        >
                          <Table.Cell className="font-semibold text-zinc-100 text-sm">
                            {s.ebookTitle}
                          </Table.Cell>
                          <Table.Cell className="text-xs text-zinc-300">
                            {s.readerName}
                          </Table.Cell>
                          <Table.Cell className="font-mono text-xs text-zinc-400">
                            {s.transactionId}
                          </Table.Cell>
                          <Table.Cell className="font-mono font-bold text-amber-400 text-sm">
                            ${Number(s.price || 0).toFixed(2)}
                          </Table.Cell>
                          <Table.Cell className="text-xs text-zinc-400">
                            {s.purchasedAt ? new Date(s.purchasedAt).toLocaleDateString() : "—"}
                          </Table.Cell>
                          <Table.Cell className="text-right">
                            <Chip
                              size="sm"
                              variant="flat"
                              className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold uppercase"
                            >
                              {s.status || "Completed"}
                            </Chip>
                          </Table.Cell>
                        </Table.Row>
                      ))
                    )}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
              <Table.Footer>
                <div className="px-4 py-3 text-xs text-zinc-400 border-t border-zinc-800 flex items-center justify-between">
                  <span>Orders: {sales.length}</span>
                  <span className="font-mono">Revenue: ${Number(totalEarnings).toFixed(2)}</span>
                </div>
              </Table.Footer>
            </Table>
          </div>
        </>
      )}
    </div>
  );
};

export default WriterSalesPage;

