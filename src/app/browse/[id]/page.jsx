import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOneEbook } from "@/lib/queries/queries";

const EbookDetailsPage = async ({ params }) => {
  const { id } = await params;
  const ebook = await getOneEbook(id);

  if (!ebook) {
    notFound();
  }

  return (
    <main className="min-h-[70vh] bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/browse"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 transition hover:text-amber-300 focus-visible:outline-none focus-visible:underline"
        >
          <span aria-hidden="true">←</span>
          Back to browse
        </Link>

        <article className="grid overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/20 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="relative min-h-[24rem] bg-slate-950 sm:min-h-[34rem]">
            <Image
              src={ebook.coverImage}
              alt={ebook.title || "Ebook cover"}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            {ebook.genre && (
              <span className="mb-5 w-fit rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                {ebook.genre}
              </span>
            )}

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              {ebook.title}
            </h1>

            {ebook.author && (
              <p className="mt-3 text-sm text-slate-400">
                By <span className="font-medium text-slate-200">{ebook.author}</span>
              </p>
            )}

            <div className="my-7 h-px bg-slate-800" />

            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
              About this book
            </h2>
            <p className="mt-3 whitespace-pre-line text-base leading-8 text-slate-300">
              {ebook.description || "No description is available for this book yet."}
            </p>

            <div className="mt-9 flex flex-wrap items-end justify-between gap-5 border-t border-slate-800 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Price
                </p>
                <p className="mt-1 text-2xl font-extrabold text-amber-400">
                  ${Number(ebook.price || 0).toFixed(2)}
                </p>
              </div>
              {ebook.status && (
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
                  {ebook.status}
                </span>
              )}
            </div>

            <Link
              href={`/dashboard/reader/purchaseEbook?ebookId=${encodeURIComponent(id)}`}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/10 transition hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Buy Now
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
};

export default EbookDetailsPage;
