"use client";

import { useState, useEffect } from "react";
import ManageEbooks from "@/components/writer/ManageEbooks";
import { authClient } from "@/lib/auth-client";
import { getEbooksByWriterId } from "@/lib/queries/queries";
import GlobalLoadingSpinner from "@/components/GlobalLoadingSpinner";
import { EbookCardSkeleton } from "@/components/LoadingSkeleton";

const WriterHomePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [ebook, setEbook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEbooks = async () => {
      if (user?.id) {
        try {
          const data = await getEbooksByWriterId(user.id);
          setEbook(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Failed to fetch ebooks:", error);
          setEbook([]);
        }
      }
      setIsLoading(false);
    };

    fetchEbooks();
  }, [user?.id]);

  return (
    <div className="min-h-screen p-4 md:p-8 text-zinc-100">
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <div className="space-y-6">
            <div className="text-center py-12">
              <GlobalLoadingSpinner size="lg" />
              <p className="mt-4 text-slate-400">Loading ebooks...</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <EbookCardSkeleton />
              <EbookCardSkeleton />
              <EbookCardSkeleton />
            </div>
          </div>
        ) : (
          <ManageEbooks ebook={ebook} user={user} />
        )}
      </div>
    </div>
  );
};

export default WriterHomePage;
