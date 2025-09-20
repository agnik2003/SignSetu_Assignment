"use client";

import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-500 p-6">
      <motion.form
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleLogin}
        className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Welcome back 👋
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="input-field mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary w-full">
          Sign In
        </button>

        {error && (
          <p className="mt-4 text-red-600 font-medium text-center">{error}</p>
        )}

        <p className="mt-6 text-center text-gray-700">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Sign Up
          </a>
        </p>
      </motion.form>
    </div>
  );
}
