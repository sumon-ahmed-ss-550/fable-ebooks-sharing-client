"use client";

import React, { useState } from "react";
import { Table, Button, Chip } from "@heroui/react";
import { Person, TrashBin, ArrowRightArrowLeft, Magnifier } from "@gravity-ui/icons";
import { adminChangeUserRole, adminDeleteUser } from "@/lib/action/action";
import { useRouter } from "next/navigation";

export default function AdminUsersTable({ initialUsers = [] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const filteredUsers = users.filter((u) =>
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.role || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleRoleChange = async (userId, currentRole) => {
    // Cycle role: reader -> writer -> admin -> reader
    const nextRoleMap = {
      reader: "writer",
      writer: "admin",
      admin: "reader",
    };
    const newRole = nextRoleMap[currentRole] || "reader";

    setLoadingId(userId);
    setErrorMsg("");

    try {
      await adminChangeUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
      router.refresh();
    } catch (err) {
      setErrorMsg(err.message || "Failed to update role");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) {
      return;
    }

    setLoadingId(userId);
    setErrorMsg("");

    try {
      await adminDeleteUser(userId);
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      router.refresh();
    } catch (err) {
      setErrorMsg(err.message || "Failed to delete user");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Person className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-bold">
              User Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-100 tracking-tight">
            Manage Platform Users
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Inspect all registered accounts, change roles, or remove accounts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Magnifier className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-amber-400 w-64"
            />
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">
          {errorMsg}
        </div>
      )}

      {/* Users Table */}
      <div className="bg-slate-900/70 rounded-2xl border border-slate-800 shadow-md overflow-hidden p-2">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Admin Users Table">
              <Table.Header>
                <Table.Column isRowHeader className="text-slate-400 font-semibold">User</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Email</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Role</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Created At</Table.Column>
                <Table.Column className="text-right text-slate-400 font-semibold">Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {filteredUsers.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={5} className="text-center py-10 text-slate-500">
                      No users match your search criteria.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  filteredUsers.map((user) => (
                    <Table.Row
                      key={user._id}
                      className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                    >
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-amber-400 uppercase">
                            {(user.name || "U")[0]}
                          </div>
                          <span className="font-semibold text-slate-100 text-sm">
                            {user.name}
                          </span>
                        </div>
                      </Table.Cell>

                      <Table.Cell className="text-xs text-slate-400 font-mono">
                        {user.email}
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          className={`capitalize font-bold text-[10px] ${
                            user.role === "admin"
                              ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                              : user.role === "writer"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          }`}
                        >
                          {user.role || "reader"}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell className="text-xs text-slate-400">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            isLoading={loadingId === user._id}
                            onPress={() => handleRoleChange(user._id, user.role || "reader")}
                            startContent={<ArrowRightArrowLeft className="w-3.5 h-3.5" />}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
                            title="Switch to next role"
                          >
                            Switch Role
                          </Button>

                          <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            isIconOnly
                            isLoading={loadingId === user._id}
                            onPress={() => handleDeleteUser(user._id, user.name)}
                            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                            title="Delete User"
                          >
                            <TrashBin className="w-4 h-4" />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
          <Table.Footer>
            <div className="px-4 py-3 text-xs text-slate-400 border-t border-slate-800">
              Total Users: {users.length}
            </div>
          </Table.Footer>
        </Table>
      </div>
    </div>
  );
}
