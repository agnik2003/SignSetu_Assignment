"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSignup(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${window.location.origin}/dashboard`, 
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess("🎉 Almost done! Please check your email to confirm your account.");
    setLoading(false);
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12">
      <motion.form
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSignup}
        className="card max-w-md w-full p-8"
      >
        <h1 className="text-2xl font-bold mb-4">Create an account</h1>

        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field mt-2"
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field mt-2"
            required
          />
        </label>

        <label className="block mb-3">
          <span className="text-sm font-medium text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mt-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm font-medium text-gray-700">
            Confirm Password
          </span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field mt-2"
            required
          />
        </label>

        {error && <div className="text-red-600 mb-3">{error}</div>}
        {success && <div className="text-green-600 mb-3">{success}</div>}

        <button disabled={loading} type="submit" className="btn-primary w-full">
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 font-medium">
            Sign in
          </a>
        </p>
      </motion.form>
    </div>
  );
}
