"use client";

import React, { useState } from "react";
import { Table, Button, Chip } from "@heroui/react";
import { BookOpen, TrashBin, Eye, EyeSlash, Magnifier } from "@gravity-ui/icons";
import { adminChangeEbookStatus, adminDeleteEbook } from "@/lib/action/action";
import { useRouter } from "next/navigation";
import SimplePagination from "../Pagination";

export default function AdminEbooksTable({ initialEbooks = [] }) {
  const router = useRouter();
  const [ebooks, setEbooks] = useState(initialEbooks);
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 12;

  const filteredEbooks = ebooks.filter((b) =>
    (b.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (b.genre || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEbooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEbooks = filteredEbooks.slice(startIndex, endIndex);

  const handleToggleStatus = async (ebookId, currentStatus) => {
    const nextStatus = currentStatus === "published" ? "unpublished" : "published";
    setLoadingId(ebookId);
    setErrorMsg("");

    try {
      await adminChangeEbookStatus(ebookId, nextStatus);
      setEbooks((prev) =>
        prev.map((b) => (b._id === ebookId ? { ...b, status: nextStatus } : b))
      );
      router.refresh();
    } catch (err) {
      setErrorMsg(err.message || "Failed to update ebook status");
    } finally {
      setLoadingId(null);
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDeleteEbook = async (ebookId, title) => {
    if (!confirm(`Are you sure you want to permanently delete "${title}"?`)) {
      return;
    }

    setLoadingId(ebookId);
    setErrorMsg("");

    try {
      await adminDeleteEbook(ebookId);
      setEbooks((prev) => prev.filter((b) => b._id !== ebookId));
      router.refresh();
    } catch (err) {
      setErrorMsg(err.message || "Failed to delete ebook");
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
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <BookOpen className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Catalog Moderation
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-slate-100 tracking-tight">
            Manage All Ebooks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Inspect all author uploads, enforce publication compliance, or delete titles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Magnifier className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or genre..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
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

      {/* Ebooks Table */}
      <div className="bg-slate-900/70 rounded-2xl border border-slate-800 shadow-md overflow-hidden p-2">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Admin All Ebooks Table">
              <Table.Header>
                <Table.Column isRowHeader className="text-slate-400 font-semibold">Ebook</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Genre</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Price</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Status</Table.Column>
                <Table.Column className="text-slate-400 font-semibold">Writer ID</Table.Column>
                <Table.Column className="text-right text-slate-400 font-semibold">Actions</Table.Column>
              </Table.Header>

              <Table.Body>
                {paginatedEbooks.length === 0 ? (
                  <Table.Row>
                    <Table.Cell colSpan={6} className="text-center py-10 text-slate-500">
                      No ebooks found.
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  paginatedEbooks.map((book) => (
                    <Table.Row
                      key={book._id}
                      className="border-b border-slate-800/60 hover:bg-slate-800/40 transition-colors"
                    >
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          {book.coverImage ? (
                            <div className="relative w-8 h-11 shrink-0 rounded overflow-hidden shadow border border-slate-800">
                              <img
                                src={book.coverImage}
                                alt={book.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-8 h-11 bg-slate-800 rounded flex items-center justify-center text-slate-500">
                              <BookOpen className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <div className="truncate max-w-[200px] sm:max-w-[260px]">
                            <span className="font-semibold text-slate-100 text-sm block truncate">
                              {book.title}
                            </span>
                            <span className="text-[10px] text-slate-500 truncate block">
                              {book.description}
                            </span>
                          </div>
                        </div>
                      </Table.Cell>

                      <Table.Cell>
                        <Chip
                          size="sm"
                          variant="flat"
                          className="bg-amber-400/10 text-amber-300 text-[10px] font-semibold uppercase"
                        >
                          {book.genre || "Fiction"}
                        </Chip>
                      </Table.Cell>

                      <Table.Cell className="font-mono text-amber-400 font-bold text-xs">
                        ${Number(book.price || 0).toFixed(2)}
                      </Table.Cell>

                      <Table.Cell>
                        {book.status === "published" ? (
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase"
                          >
                            Published
                          </Chip>
                        ) : (
                          <Chip
                            size="sm"
                            variant="flat"
                            className="bg-slate-800 text-slate-400 border border-slate-700 text-[10px] font-bold uppercase"
                          >
                            Unpublished
                          </Chip>
                        )}
                      </Table.Cell>

                      <Table.Cell className="text-xs font-mono text-slate-500">
                        {book.writerId ? `${String(book.writerId).slice(0, 10)}...` : "—"}
                      </Table.Cell>

                      <Table.Cell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            variant="flat"
                            isLoading={loadingId === book._id}
                            onPress={() => handleToggleStatus(book._id, book.status)}
                            startContent={
                              book.status === "published" ? (
                                <EyeSlash className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )
                            }
                            className={`text-xs font-semibold cursor-pointer ${
                              book.status === "published"
                                ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            }`}
                          >
                            {book.status === "published" ? "Unpublish" : "Publish"}
                          </Button>

                          <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            isIconOnly
                            isLoading={loadingId === book._id}
                            onPress={() => handleDeleteEbook(book._id, book.title)}
                            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                            title="Delete Ebook"
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
            <div className="px-4 py-3 text-xs text-slate-400 border-t border-slate-800 flex items-center justify-between">
              <span>Total Books: {ebooks.length}</span>
              <span>Showing {startIndex + 1}-{Math.min(endIndex, filteredEbooks.length)} of {filteredEbooks.length}</span>
            </div>
          </Table.Footer>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <SimplePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
