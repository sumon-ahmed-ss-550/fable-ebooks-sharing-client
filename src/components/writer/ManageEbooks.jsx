"use client";

import { useState, useEffect } from "react";
import { Table, Button, Chip, Modal, useOverlayState } from "@heroui/react";
import {
  PencilToSquare,
  TrashBin,
  Eye,
  EyeSlash,
  Plus,
  ShieldCheck,
  BookOpen,
  Chart,
  CreditCard,
} from "@gravity-ui/icons";
import {
  changePublishedAndUnpublishedStatus,
  deleteEbook,
} from "@/lib/action/action";
import { getWriterSales } from "@/lib/queries/queries";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WriterAddEbookForm from "./WriterAddEbookForm";
import { PaginationWithSummary } from "../Pagination";

const EditEbookModal = ({ book, router }) => {
  const modalState = useOverlayState();

  return (
    <Modal state={modalState}>
      <Button
        size="sm"
        variant="flat"
        isIconOnly
        aria-label={`Edit ${book.title}`}
        className="text-zinc-300 bg-zinc-800 hover:bg-zinc-700 cursor-pointer"
      >
        <PencilToSquare className="w-4 h-4" />
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="max-w-3xl">
            <Modal.CloseTrigger />
            <Modal.Header>
              <h2 className="text-xl font-semibold">Edit Ebook</h2>
            </Modal.Header>
            <Modal.Body className="p-6">
              <WriterAddEbookForm ebook={book} onSuccess={modalState.close} />
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

const ManageEbooks = ({ ebook = [], user = null }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [salesData, setSalesData] = useState(null);
  const [loadingSales, setLoadingSales] = useState(false);

  const totalBooks = ebook?.length || 0;
  const publishedCount =
    ebook?.filter((b) => b.status === "published").length || 0;
  const unpublishedCount =
    ebook?.filter((b) => b.status === "unpublished").length || 0;

  const isVerified = user?.writerVerificationStatus === "verified";

  // Load sales data
  useEffect(() => {
    if (user?.id) {
      setLoadingSales(true);
      getWriterSales(user.id)
        .then((data) => {
          setSalesData(data);
        })
        .catch((err) => {
          console.error("Error loading sales:", err);
        })
        .finally(() => {
          setLoadingSales(false);
        });
    }
  }, [user?.id]);

  // handle status toggler
  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";
    const data = await changePublishedAndUnpublishedStatus(id, newStatus);
    if (data) {
      router.refresh();
    }
  };

  // delete ebooks
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this ebook?")) {
      return;
    }

    setDeletingId(id);
    setDeleteError("");

    try {
      await deleteEbook(id);
      router.refresh();
    } catch (error) {
      setDeleteError(error.message || "Could not delete the ebook.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18181b] p-6 rounded-2xl border border-zinc-800 shadow-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[10px] font-bold uppercase tracking-wider">
              Writer Studio
            </span>
            {isVerified ? (
              <Chip
                size="sm"
                variant="flat"
                className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold text-[10px]"
              >
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Writer
                </span>
              </Chip>
            ) : (
              <Chip
                size="sm"
                variant="flat"
                className="bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold text-[10px]"
              >
                <span className="flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  Verification Required
                </span>
              </Chip>
            )}
          </div>
          <h1 className="text-2xl font-bold font-serif text-white">
            Manage Ebooks
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            View, edit, or toggle publication state of your authored ebooks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isVerified && (
            <Button
              color="primary"
              startContent={<CreditCard className="w-4 h-4" />}
              className="font-semibold bg-blue-500 hover:bg-blue-600 shadow-sm cursor-pointer"
            >
              Verify Account
            </Button>
          )}
          <Link href="/dashboard/writer/edit_ebook/add_ebook">
            <Button
              color="warning"
              startContent={<Plus className="w-4 h-4" />}
              isDisabled={!isVerified}
              className="font-semibold text-slate-950 bg-amber-400 hover:bg-amber-500 shadow-sm cursor-pointer"
            >
              Create Ebook
            </Button>
          </Link>
        </div>
      </div>

      {/* Writer Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#18181b] border border-zinc-800">
          <span className="text-xs text-zinc-400 uppercase tracking-wider block font-semibold">
            Total Ebooks
          </span>
          <span className="text-2xl font-black text-white font-mono mt-1 block">
            {totalBooks}
          </span>
          <span className="text-[11px] text-zinc-500 mt-0.5 block">
            Authored literature
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#18181b] border border-zinc-800">
          <span className="text-xs text-emerald-400 uppercase tracking-wider block font-semibold">
            Published Live
          </span>
          <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
            {publishedCount}
          </span>
          <span className="text-[11px] text-zinc-500 mt-0.5 block">
            Available on Browse page
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-[#18181b] border border-zinc-800">
          <span className="text-xs text-amber-400 uppercase tracking-wider block font-semibold">
            Drafts / Unpublished
          </span>
          <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
            {unpublishedCount}
          </span>
          <span className="text-[11px] text-zinc-500 mt-0.5 block">
            Private drafts
          </span>
        </div>
      </div>

      {/* Sales Overview */}
      {isVerified && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#18181b] border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <Chart className="w-5 h-5 text-emerald-400" />
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                Total Sales
              </span>
            </div>
            <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
              {loadingSales ? "..." : salesData?.totalSales || 0}
            </span>
            <span className="text-[11px] text-zinc-500 mt-0.5 block">
              Successful purchases
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[#18181b] border border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-amber-400" />
              <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                Total Earnings
              </span>
            </div>
            <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
              {loadingSales ? "..." : `$${salesData?.totalEarnings?.toFixed(2) || "0.00"}`}
            </span>
            <span className="text-[11px] text-zinc-500 mt-0.5 block">
              Revenue from sales
            </span>
          </div>
        </div>
      )}

      {deleteError && (
        <p role="alert" className="text-sm text-rose-400">
          {deleteError}
        </p>
      )}

      {/* Table Container Card */}
      <div className="bg-[#18181b] rounded-2xl border border-zinc-800 shadow-md overflow-hidden p-2">
        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Writer Ebooks Table">
              <Table.Header>
                <Table.Column
                  isRowHeader
                  className="text-zinc-400 font-semibold"
                >
                  Title
                </Table.Column>
                <Table.Column className="text-zinc-400 font-semibold">
                  Price
                </Table.Column>
                <Table.Column className="text-zinc-400 font-semibold">
                  Status
                </Table.Column>
                <Table.Column className="text-right text-zinc-400 font-semibold">
                  Actions
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {ebook.length === 0 ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={4}
                      className="text-center py-10 text-zinc-500"
                    >
                      <div className="space-y-3">
                        <p>No ebooks found. Click Create Ebook to get started.</p>
                        <Link href="/dashboard/writer/edit_ebook/add_ebook">
                          <Button
                            size="sm"
                            color="warning"
                            className="bg-amber-400 text-slate-950 font-bold"
                          >
                            Add Your First Ebook
                          </Button>
                        </Link>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  ebook.map((book) => (
                    <Table.Row
                      key={book._id}
                      className="border-b border-zinc-800/60 hover:bg-zinc-800/40 transition-colors"
                    >
                      {/* Title */}
                      <Table.Cell className="font-medium text-zinc-100">
                        <div>
                          <span className="font-bold block text-sm">{book.title}</span>
                          <span className="text-xs text-zinc-500">
                            Genre: {book.genre || "Fiction"}
                          </span>
                        </div>
                      </Table.Cell>

                      {/* Price */}
                      <Table.Cell className="text-amber-400 font-mono font-bold">
                        {book.price === 0
                          ? "Free"
                          : `$${Number(book.price).toFixed(2)}`}
                      </Table.Cell>

                      {/* Status */}
                      <Table.Cell>
                        {book.status === "published" ? (
                          <Chip
                            size="sm"
                            variant="flat"
                            color="success"
                            className="capitalize font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          >
                            Published
                          </Chip>
                        ) : (
                          <Chip
                            size="sm"
                            variant="flat"
                            color="default"
                            className="capitalize font-medium text-zinc-400 bg-zinc-800 border border-zinc-700"
                          >
                            Unpublished
                          </Chip>
                        )}
                      </Table.Cell>

                      {/* Actions */}
                      <Table.Cell>
                        <div className="flex items-center justify-end gap-2">
                          {/* Preview in public */}
                          <Link
                            href={`/browse/${encodeURIComponent(book._id)}`}
                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-700 transition"
                            title="Public Preview"
                          >
                            <BookOpen className="w-4 h-4" />
                          </Link>

                          {/* status toggler button */}
                          <Button
                            size="sm"
                            variant="flat"
                            color={
                              book.status === "published"
                                ? "warning"
                                : "success"
                            }
                            onPress={() =>
                              handleToggleStatus(book._id, book.status)
                            }
                            startContent={
                              book.status === "published" ? (
                                <EyeSlash className="w-3.5 h-3.5" />
                              ) : (
                                <Eye className="w-3.5 h-3.5" />
                              )
                            }
                            className={`cursor-pointer ${
                              book.status === "published"
                                ? "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            }`}
                          >
                            {book.status === "published"
                              ? "Unpublish"
                              : "Publish"}
                          </Button>

                          {/* edit modal */}
                          <EditEbookModal book={book} router={router} />

                          {/* delete button */}
                          <Button
                            size="sm"
                            variant="flat"
                            color="danger"
                            isIconOnly
                            aria-label={`Delete ${book.title}`}
                            onPress={() => handleDelete(book._id)}
                            isLoading={deletingId === book._id}
                            isDisabled={deletingId !== null}
                            className="bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
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
            <div className="px-4 py-3 text-xs text-zinc-400 border-t border-zinc-800">
              Total Ebooks: {ebook.length}
            </div>
          </Table.Footer>
        </Table>
      </div>

      {/* pagination with summary */}
      <div className="mt-4">
        <PaginationWithSummary />
      </div>
    </div>
  );
};

export default ManageEbooks;
