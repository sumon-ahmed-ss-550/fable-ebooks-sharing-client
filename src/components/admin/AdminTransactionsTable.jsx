"use client";

import React, { useState } from "react";
import { Table, Chip } from "@heroui/react";
import { CreditCard, Magnifier, Receipt } from "@gravity-ui/icons";

export default function AdminTransactionsTable({ initialTransactions = [] }) {
  const [search, setSearch] = useState("");

  const filtered = initialTransactions.filter((t) =>
    (t.transactionId || "").toLowerCase().includes(search.toLowerCase()) ||
    (t.ebookTitle || "").toLowerCase().includes(search.toLowerCase()) ||
    (t.readerName || "").toLowerCase().includes(search.toLowerCase()) ||
    (t.readerEmail || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = initialTransactions.reduce(
    (sum, t) => sum + (Number(t.price) || 0),
    0
  );

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <CreditCard className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
              Financial Audit
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-100 tracking-tight">
            All Platform Transactions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time ledger of completed ebook purchases across all readers and authors.
          </p>
        </div>

        {/* Total Revenue Pill */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Platform Sales
            </span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              ${totalRevenue.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Magnifier className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by transaction ID, buyer, or book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900/80 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition"
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900/70 rounded-2xl border border-slate-800 shadow-md overflow-hidden p-2">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Admin Transactions Table">
              <Table.Header>
                <Table.Column isRowHeader className="text-slate-400 font-semibold">Transaction ID</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Buyer</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Ebook Title</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Amount</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Payment Method</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Date</Table.Column>
                <Table.Column className="text-right text-slate-400 font-semibold">Status</Table.Column>
              </Table.Header>

              <Table.Body>
                {filtered.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={7} className="text-center py-10 text-slate-500">
                      No transaction records found.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filtered.map((item) => (
                    <Table.Row
                      key={item._id}
                      className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                    >
                      <Table.Cell className="font-mono text-xs text-amber-400 font-semibold">
                        {item.transactionId}
                      </Table.Cell>

                      <Table.Cell>
                        <span className="font-semibold text-slate-200 block text-xs">
                          {item.readerName}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {item.readerEmail}
                        </span>
                      </Table.Cell>

                      <Table.Cell className="font-medium text-slate-100 text-xs max-w-xs truncate">
                        {item.ebookTitle}
                      </Table.Cell>

                      <Table.Cell className="font-mono font-bold text-amber-400 text-sm">
                        ${Number(item.price || 0).toFixed(2)}
                      </Table.Cell>

                      <Table.Cell className="text-xs text-slate-300">
                        {item.paymentMethod || "Online"}
                      </Table.Cell>

                      <Table.Cell className="text-xs text-slate-400">
                        {item.purchasedAt
                          ? new Date(item.purchasedAt).toLocaleDateString()
                          : "—"}
                      </Table.Cell>

                      <Table.Cell className="text-right">
                        <Chip
                          size="sm"
                          variant="flat"
                          className="capitalize font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]"
                        >
                          {item.status || "Completed"}
                        </Chip>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          <Table.Footer>
            <div className="px-4 py-3 text-xs text-slate-400 border-t border-slate-800 flex items-center justify-between">
              <span>Total Transactions: {initialTransactions.length}</span>
              <span className="font-mono font-bold text-amber-400">
                Gross Volume: ${totalRevenue.toFixed(2)}
              </span>
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}
