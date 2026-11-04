export const EbookCardSkeleton = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60">
      <div className="h-72 w-full bg-slate-800 animate-pulse"></div>
      <div className="flex flex-grow flex-col justify-between bg-slate-900/40 p-5">
        <div>
          <div className="h-6 w-3/4 bg-slate-800 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-full bg-slate-800 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-2/3 bg-slate-800 rounded animate-pulse"></div>
        </div>
        <div className="mt-5 border-t border-slate-800 pt-4">
          <div className="h-5 w-20 bg-slate-800 rounded animate-pulse mb-2"></div>
          <div className="h-8 w-full bg-slate-800 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const TableRowSkeleton = () => {
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="h-6 w-24 bg-slate-800 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-32 bg-slate-800 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-slate-800 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-6 w-24 bg-slate-800 rounded animate-pulse"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-8 w-20 bg-slate-800 rounded animate-pulse"></div>
      </td>
    </tr>
  );
};

export const StatCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="h-6 w-32 bg-slate-800 rounded animate-pulse mb-4"></div>
      <div className="h-10 w-24 bg-slate-800 rounded animate-pulse"></div>
    </div>
  );
};

export const WriterCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="h-20 w-20 rounded-full bg-slate-800 animate-pulse mb-4"></div>
      <div className="h-6 w-32 bg-slate-800 rounded animate-pulse mb-2"></div>
      <div className="h-4 w-24 bg-slate-800 rounded animate-pulse"></div>
    </div>
  );
};

export const GenreCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 h-32 flex items-center justify-center">
      <div className="h-6 w-24 bg-slate-800 rounded animate-pulse"></div>
    </div>
  );
};
