import GlobalLoadingSpinner from "@/components/GlobalLoadingSpinner";
import { EbookCardSkeleton } from "@/components/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-100 max-w-7xl mx-auto">
      <div className="space-y-6">
        <div className="text-center py-12">
          <GlobalLoadingSpinner size="lg" />
          <p className="mt-4 text-slate-400">Loading bookmarks...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <EbookCardSkeleton />
          <EbookCardSkeleton />
          <EbookCardSkeleton />
        </div>
      </div>
    </div>
  );
}
