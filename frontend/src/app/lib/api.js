import { supabase } from './supabaseClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

async function getToken() {
  const { data } = await supabase.auth.getSession();
  return data?.session?.access_token ?? null;
}

export async function fetchStudyBlocks() {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/blocks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch study blocks');
  return res.json();
}

export async function createStudyBlock(blockStart, blockEnd) {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/blocks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ blockStart, blockEnd }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create study block');
  }
  return res.json();
}

export async function deleteStudyBlock(id) {
  const token = await getToken();
  const res = await fetch(`${API_BASE_URL}/blocks/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to delete study block');
  return res.json();
}
