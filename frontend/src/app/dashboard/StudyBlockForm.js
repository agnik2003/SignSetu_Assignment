"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function StudyBlockForm({ onSuccess }) {
  const [blockStart, setBlockStart] = useState("");
  const [blockEnd, setBlockEnd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!blockStart || !blockEnd) return setError("Please select both start and end times.");
    if (new Date(blockStart) >= new Date(blockEnd)) return setError("End must be after start.");

    setLoading(true);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data?.session?.access_token;
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"}/blocks`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ blockStart, blockEnd }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to create block");
      }
      setBlockStart("");
      setBlockEnd("");
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 rounded-xl shadow-md">
      <div className="grid gap-4">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Start</span>
          <input type="datetime-local" value={blockStart} onChange={e => setBlockStart(e.target.value)} className="input-field mt-2" required />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700">End</span>
          <input type="datetime-local" value={blockEnd} onChange={e => setBlockEnd(e.target.value)} className="input-field mt-2" required />
        </label>

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <div className="flex justify-end">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Creating..." : "Create Block"}
          </button>
        </div>
      </div>
    </form>
  );
}
