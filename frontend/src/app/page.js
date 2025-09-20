"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-br from-sky-600 via-indigo-600 to-cyan-500 text-white p-10">
        <div className="flex flex-col items-center text-center max-w-3xl space-y-6">
          {/* Text Section */}
          <motion.h1
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl leading-tight font-extrabold"
          >
            Focus Better. Study Smarter.
          </motion.h1>

          <motion.p
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="text-lg text-gray-200 max-w-xl"
          >
            Create silent study blocks, manage your time efficiently, and
            improve focus with our productivity tool.
          </motion.p>

          <div className="flex gap-4 justify-center">
            <a
              href="/signup"
              className="btn-primary bg-white text-sky-700 hover:bg-gray-100"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="btn-primary bg-indigo-700 hover:bg-indigo-800"
            >
              Log In
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
