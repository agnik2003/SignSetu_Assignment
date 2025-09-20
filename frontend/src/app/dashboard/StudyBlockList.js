"use client";
import { supabase } from "../lib/supabaseClient";

export default function StudyBlockList({ blocks = [], refresh }) {
  async function deleteBlock(id) {
    const { data } = await supabase.auth.getSession();
    const token = data?.session?.access_token;
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api"}/blocks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await refresh();
  }

  if (!blocks || blocks.length === 0) {
    return <p className="text-center text-gray-500">No silent-study blocks yet.</p>;
  }

  return (
    <div className="grid gap-4 max-w-3xl mx-auto">
      {blocks.map(({ _id, blockStart, blockEnd }) => (
        <div key={_id} className="card p-4 rounded-lg flex items-center justify-between shadow-sm hover:shadow-lg transition">
          <div>
            <div className="text-sm text-gray-500">Start</div>
            <div className="font-semibold">{new Date(blockStart).toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-2">End</div>
            <div className="font-semibold">{new Date(blockEnd).toLocaleString()}</div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <button className="btn-danger" onClick={() => deleteBlock(_id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
