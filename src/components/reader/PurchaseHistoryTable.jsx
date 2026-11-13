"use client";

import React from "react";
import { Table, Chip, Button } from "@heroui/react";
import { ClockArrowRotateLeft, Receipt, BookOpen } from "@gravity-ui/icons";
import Link from "next/link";

export default function PurchaseHistoryTable({ purchases = [] }) {
  const totalSpent = purchases.reduce(
    (sum, p) => sum + (Number(p.price) || 0),
    0,
  );

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <ClockArrowRotateLeft className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
              Account Orders
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-100 tracking-tight">
            Purchase History
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Detailed receipts and transactions for all books you have purchased.
          </p>
        </div>

        {/* Stats card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Total Books
            </span>
            <span className="text-xl font-bold text-slate-100 font-mono">
              {purchases.length}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
              Total Spent
            </span>
            <span className="text-xl font-bold text-amber-400 font-mono">
              ${totalSpent.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900/70 rounded-2xl border border-slate-800 shadow-md overflow-hidden p-2">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Purchase History Table">
              <Table.Header>
                <Table.Column isRowHeader className="text-slate-400 font-semibold">
                  Ebook
                </Table.Column>
                <Table.Column className="text-slate-400 font-semibold">
                  Transaction ID
                </Table.Column>
                <Table.Column className="text-slate-400 font-semibold">
                  Price
                </Table.Column>
                <Table.Column className="text-slate-400 font-semibold">
                  Payment Method
                </Table.Column>
                <Table.Column className="text-slate-400 font-semibold">
                  Date
                </Table.Column>
                <Table.Column className="text-right text-slate-400 font-semibold">
                  Status
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {purchases.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={6}
                      className="text-center py-12 text-slate-500"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Receipt className="w-8 h-8 text-slate-600" />
                        <p className="text-sm">No transaction records found yet.</p>
                        <Link
                          href="/browse"
                          className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl transition"
                        >
                          Find Ebooks to Buy
                        </Link>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  purchases.map((item) => (
                    <Table.Row
                      key={item._id}
                      className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                    >
                      {/* Ebook Details */}
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          {item.ebookCoverImage ? (
                            <div className="relative w-9 h-12 shrink-0 rounded overflow-hidden shadow border border-slate-800">
                              <img
                                src={item.ebookCoverImage}
                                alt={item.ebookTitle}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-9 h-12 bg-slate-800 rounded flex items-center justify-center text-slate-500">
                              <BookOpen className="w-4 h-4" />
                            </div>
                          )}
                          <div className="truncate max-w-[200px] sm:max-w-[280px]">
                            <span className="font-semibold text-slate-100 text-sm block truncate">
                              {item.ebookTitle}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Digital Edition
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      {/* Transaction ID */}
                      <Table.Cell className="font-mono text-xs text-slate-400">
                        {item.transactionId}
                      </Table.Cell>

                      {/* Price */}
                      <Table.Cell className="font-mono font-bold text-amber-400 text-sm">
                        ${Number(item.price || 0).toFixed(2)}
                      </Table.Cell>

                      {/* Payment Method */}
                      <Table.Cell className="text-xs text-slate-300">
                        {item.paymentMethod || "Online"}
                      </Table.Cell>

                      {/* Date */}
                      <Table.Cell className="text-xs text-slate-400">
                        {item.purchasedAt
                          ? new Date(item.purchasedAt).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )
                          : "—"}
                      </Table.Cell>

                      {/* Status */}
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
              <span>Total Transactions: {purchases.length}</span>
              <span className="font-mono">
                Lifetime Value: ${totalSpent.toFixed(2)}
              </span>
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}
