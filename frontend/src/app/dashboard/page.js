"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import StudyBlockForm from "./StudyBlockForm";
import StudyBlockList from "./StudyBlockList";
import { supabase } from "../lib/supabaseClient";

export default function DashboardPage() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchBlocks() {
    setLoading(true);
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    if (!token) {
      setBlocks([]);
      setLoading(false);
      return;
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"}/blocks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const json = await response.json();
      setBlocks(json);
    } else {
      setBlocks([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchBlocks();
  }, []);

  return (
    <ProtectedRoute>
      <div className="container py-12">
        <h2 className="text-3xl font-extrabold mb-6">Your Silent-Study Blocks</h2>

        <div className="max-w-xl mx-auto mb-8">
          <StudyBlockForm onSuccess={fetchBlocks} />
        </div>

        <div>
          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading blocks...</div>
          ) : (
            <StudyBlockList blocks={blocks} refresh={fetchBlocks} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
