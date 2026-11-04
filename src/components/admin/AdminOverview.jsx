"use client";

import React from "react";
import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import {
  House,
  Person,
  BookOpen,
  CreditCard,
  ArrowRight,
  Receipt,
} from "@gravity-ui/icons";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function AdminOverview({ stats = {} }) {
  const {
    totalRevenue = 0,
    totalUsers = 0,
    readersCount = 0,
    writersCount = 0,
    totalEbooks = 0,
    totalTransactions = 0,
    recentPurchases = [],
  } = stats;

  // Prepare chart data
  const userDistributionData = [
    { name: "Readers", value: readersCount, color: "#6366f1" },
    { name: "Writers", value: writersCount, color: "#f59e0b" },
  ];

  // Process recent purchases for revenue chart
  const revenueChartData = recentPurchases
    .slice(0, 10)
    .map((txn) => ({
      date: new Date(txn.purchasedAt).toLocaleDateString(),
      amount: Number(txn.price || 0),
      ebook: txn.ebookTitle,
    }))
    .reverse();

  // Calculate genre distribution from recent purchases
  const genreData = recentPurchases.reduce((acc, txn) => {
    const genre = txn.genre || "Other";
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const genreChartData = Object.entries(genreData).map(([name, value]) => ({
    name,
    value,
  }));

  const statCards = [
    {
      label: "Total Platform Revenue",
      value: `$${Number(totalRevenue).toFixed(2)}`,
      sub: "From completed ebook sales",
      icon: CreditCard,
      color: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    },
    {
      label: "Total Registered Users",
      value: totalUsers,
      sub: `${readersCount} Readers • ${writersCount} Writers`,
      icon: Person,
      color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
    },
    {
      label: "Total Published Ebooks",
      value: totalEbooks,
      sub: "Across all literature genres",
      icon: BookOpen,
      color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    },
    {
      label: "Total Orders Completed",
      value: totalTransactions,
      sub: "Digital transactions processed",
      icon: Receipt,
      color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    },
  ];

  return (
    <div className="w-full space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <House className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
              Administrator Portal
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-100 tracking-tight">
            Platform Analytics & Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time health, user metrics, and commercial transactions on Fable.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/dashboard/admin/transaction"
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition shadow-md"
          >
            View Transactions →
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, idx) => (
          <Card
            key={idx}
            className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-lg hover:border-slate-700 transition"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl border ${card.color}`}>
                <card.icon className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black font-mono text-slate-100 block">
                {card.value}
              </span>
              <span className="text-xs text-slate-500 mt-1 block">
                {card.sub}
              </span>
            </div>
          </Card>
        ))}
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution Pie Chart */}
        <Card className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-slate-100 font-serif mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {userDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Revenue Trend Line Chart */}
        <Card className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-slate-100 font-serif mb-4">Recent Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="date"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
                formatter={(value) => [`$${value.toFixed(2)}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: "#f59e0b", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Genre Distribution Bar Chart */}
      {genreChartData.length > 0 && (
        <Card className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <h3 className="text-sm font-bold text-slate-100 font-serif mb-4">Genre Popularity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={genreChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="name"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "8px",
                  color: "#f1f5f9",
                }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Link
          href="/dashboard/admin/transaction/users"
          className="group p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 transition-all flex items-center justify-between shadow-lg"
        >
          <div>
            <h3 className="font-bold text-slate-100 group-hover:text-indigo-400 text-base transition-colors">
              Manage Users
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              View user accounts, change roles, and manage permissions.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/admin/transaction/users/ebook"
          className="group p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between shadow-lg"
        >
          <div>
            <h3 className="font-bold text-slate-100 group-hover:text-emerald-400 text-base transition-colors">
              Manage All Ebooks
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Inspect authored catalog, toggle publication status, or remove.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
        </Link>

        <Link
          href="/dashboard/admin/transaction"
          className="group p-6 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all flex items-center justify-between shadow-lg"
        >
          <div>
            <h3 className="font-bold text-slate-100 group-hover:text-amber-400 text-base transition-colors">
              Transactions & Revenue
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Full transaction logs, payments, and revenue verification.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>

      {/* Recent Purchases Section */}
      <div className="bg-slate-900/70 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg font-bold text-slate-100 font-serif">
              Recent Completed Sales
            </h2>
          </div>
          <Link
            href="/dashboard/admin/transaction"
            className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
          >
            View All ({totalTransactions}) →
          </Link>
        </div>

        {recentPurchases.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">
            No transactions registered yet.
          </p>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {recentPurchases.map((txn) => (
              <div
                key={txn._id}
                className="py-3.5 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <span className="font-semibold text-slate-200 block text-sm">
                    {txn.ebookTitle}
                  </span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    Buyer: {txn.readerName} ({txn.readerEmail}) • {txn.transactionId}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-amber-400 text-sm block">
                    ${Number(txn.price || 0).toFixed(2)}
                  </span>
                  <Chip
                    size="sm"
                    variant="flat"
                    className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    {txn.status}
                  </Chip>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

