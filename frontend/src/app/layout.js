"use client";
import "./globals.css";
import Navbar from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="w-full py-6 mt-10 bg-gray-900/80 backdrop-blur-md border-t border-gray-700 shadow-inner">
          <div className="container mx-auto text-center text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center gap-2">
            <span>© {new Date().getFullYear()} SilentStudy</span>
            <span>Built with ❤️ by Your Name</span>
            <div className="flex gap-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-teal-400 transition">
                Privacy
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                Terms
              </a>
              <a href="#" className="hover:text-teal-400 transition">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
