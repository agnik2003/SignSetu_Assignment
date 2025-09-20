"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) setAuthenticated(true);
      else router.push("/login");
      setLoading(false);
    });
  }, [router]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>;
  }

  if (!authenticated) return null;

  return <>{children}</>;
}
