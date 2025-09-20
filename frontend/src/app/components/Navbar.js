"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  }

  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container flex items-center justify-between py-3">
        <motion.div
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <span
            onClick={() => router.push("/dashboard")}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-80 transition"
          >
            SilentStudy
          </span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-purple-600 transition">
            Home
          </Link>
          <Link href="/dashboard" className="hover:text-purple-600 transition">
            Dashboard
          </Link>
          {!user ? (
            <>
              <Link href="/login" className="hover:text-purple-600 transition">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/dashboard")}
                className="text-sm px-3 py-1 rounded-md border"
              >
                {user.email}
              </button>
              <button onClick={handleLogout} className="btn-danger">
                Logout
              </button>
            </>
          )}
        </nav>

        {/* mobile */}
        <div className="md:hidden">
          <button
            aria-label="menu"
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md border"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                stroke="#0f172a"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden border-t border-gray-100 bg-white"
        >
          <div className="flex flex-col gap-2 p-4">
            <Link href="/" onClick={() => setOpen(false)} className="py-2">
              Home
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="py-2"
            >
              Dashboard
            </Link>
            {!user ? (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="py-2"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="py-2 btn-primary text-center"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="py-2">{user.email}</div>
                <button
                  onClick={() => {
                    handleLogout();
                    setOpen(false);
                  }}
                  className="py-2 btn-danger"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
}
