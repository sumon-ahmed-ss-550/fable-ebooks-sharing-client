"use client";

import { useState, useEffect } from "react";
import { getAllWriters } from "@/lib/queries/queries";
import WritersList from "@/components/WritersList";

export default function AuthorsPage() {
  const [writers, setWriters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const data = await getAllWriters();
        setWriters(data);
      } catch (err) {
        console.error("Error fetching writers:", err);
        setWriters([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWriters();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <WritersList writers={writers} isLoading={isLoading} />
    </div>
  );
}
