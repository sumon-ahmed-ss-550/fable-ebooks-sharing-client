import GlobalLoadingSpinner from "@/components/GlobalLoadingSpinner";

export default function Loading() {
  return (
    <main className="min-h-[70vh] bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <GlobalLoadingSpinner size="xl" />
            <p className="mt-4 text-slate-400">Loading ebook details...</p>
          </div>
        </div>
      </div>
    </main>
  );
}
